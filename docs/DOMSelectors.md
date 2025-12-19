# DOMSelector Entity and Usage

The `DomSelector` entity defines how the platform identifies and extracts data from web pages using CSS selectors, optional attribute extraction, and a strategy for handling multiple matches. These selectors are owned by an `ExtensionContext` (via `extensionContextId`) and can be activated/deactivated and versioned over time.

### Entity: `DomSelector`

```ts
@Entity({ name: 'selectors' })
@Check('CHK_selectors_multiple_strategy', "multiple_strategy IN ('first','last','all')")
export class DomSelector {
  @PrimaryGeneratedColumn('increment')
  id: number;                        // DB primary key

  @IsInt()
  @Column({ name: 'extension_context_id', type: 'int' })
  extensionContextId: number;        // FK to ExtensionContext

  @IsString() @IsNotEmpty()
  @Column({ type: 'varchar', length: 100, name: 'key' })
  key: string;                       // Logical name (unique per siteId + key)

  @IsString() @IsNotEmpty()
  @Column({ type: 'text' })
  selector: string;                  // CSS selector used to query the DOM

  @IsArray() @IsString({ each: true })
  @Column({ type: 'text', array: true, default: '{}' })
  fallbacks: string[];               // Optional list of backup selectors tried in order

  @IsString() @IsIn(['first', 'last', 'all'])
  @Column({ name: 'multiple_strategy', type: 'varchar', length: 20, default: 'first' })
  multipleStrategy: 'first' | 'last' | 'all';

  @IsOptional() @IsString()
  @Column({ type: 'varchar', length: 50, nullable: true })
  attribute?: string | null;         // e.g., 'href', 'src', 'textContent' (null => extract text)

  @IsOptional() @IsString()
  @Column({ type: 'text', nullable: true })
  description?: string | null;       // Human-readable explanation/documentation

  @IsInt()
  @Column({ type: 'int', default: 1 })
  version: number;                   // Increment for non-breaking/breaking updates

  @IsBoolean()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;                 // Enable/disable without deleting

  @IsDate()
  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @IsDate()
  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
```

## Purpose

Use `DomSelector` records to define where and how to extract information from a page. Each record specifies a primary CSS selector and optional fallback selectors. When multiple elements match, a `multipleStrategy` defines whether to return the first match, last match, or all matches. If `attribute` is set, that attribute is extracted; otherwise, plain text is extracted.

## Field Reference

- id: Auto-increment primary key.
- extensionContextId: References the parent `ExtensionContext` that owns these selectors.
- key: A logical identifier for the selector (unique in combination with `siteId`; see unique constraint note below).
- selector: Primary CSS selector string.
- fallbacks: Array of backup selector strings to try in order if `selector` fails to match.
- multipleStrategy: How to handle multiple matches. Allowed values: `first`, `last`, `all`.
- attribute: When set, extract that attribute; when null/undefined, extract text content.
- description: Optional human-readable notes.
- version: Increment when updating selectors; allows clients to handle schema/behavior changes.
- isActive: Soft-enable/disable the selector.
- createdAt / updatedAt: Audit timestamps.

Note on constraints:
- Database table name: `selectors`.
- Unique constraint: `UQ_selectors_site_key (siteId, key)`. Ensure your upsert logic sets `siteId` appropriately if present in your schema. If your codebase doesn’t have `siteId` in this entity, the constraint likely comes from a DB-level composite key in a migration; keep `key` globally unique per logical site.
- Check constraint enforces `multiple_strategy` to one of `first`, `last`, `all`.

## Multiple Match Strategies

- first: Return the first matching element’s value.
- last: Return the last matching element’s value.
- all: Return an array of values for all matching elements.

## Extraction Semantics

The extraction should follow this order:
1. Try `selector`. If it matches nothing, try each selector in `fallbacks` until one matches.
2. If a selector matches multiple nodes, apply `multipleStrategy`.
3. Value extraction:
   - If `attribute` is provided, return `element.getAttribute(attribute)` for each selected element.
   - If no `attribute`, return trimmed text content (e.g., `element.textContent?.trim()`), or an empty string when absent.

## Example Records

Product price (single value):
```json
{
  "extensionContextId": 42,
  "key": "product.price",
  "selector": ".product-card .price",
  "fallbacks": [".pdp .price", "meta[itemprop=price]"]
  ,"multipleStrategy": "first",
  "attribute": null,
  "description": "Primary price on product page",
  "version": 2,
  "isActive": true
}
```

Product gallery image URLs (multiple values):
```json
{
  "extensionContextId": 42,
  "key": "product.gallery",
  "selector": ".gallery img",
  "fallbacks": [],
  "multipleStrategy": "all",
  "attribute": "src",
  "description": "All gallery image sources",
  "version": 1,
  "isActive": true
}
```

## Validation

Runtime validation (via `class-validator`) enforces:
- `key`, `selector` are non-empty strings.
- `fallbacks` is an array of strings (default empty array).
- `multipleStrategy` is one of `first`, `last`, `all`.
- `attribute`, `description` are optional strings.
- `version` is an integer, `isActive` is boolean, timestamps are dates.

## Typical Operations

1. Create selector definitions for an `ExtensionContext` during onboarding or scraping task setup.
2. Update `selector`/`fallbacks`/`attribute` when site HTML changes; increment `version`.
3. Deactivate with `isActive = false` to temporarily disable extraction without deleting history.

See also: `docs/ExtensionContext.md` for the owning context entity.

### Todo

* Support for Multiple Strategies for selectors that match multiple elements.