# DOMSelector

The `DomSelector` entity stores CSS selectors used by browser extensions. Selectors are fetched remotely at runtime, so they can be updated server-side without redeploying or republishing the extension.

## Entity: `DomSelector`

```ts
@Entity({ name: 'domselectors' })
export class DomSelector {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'extension_context_id', type: 'int' })
  extensionContextId: number;   // FK to ExtensionContext (which extension/site this belongs to)

  @Column({ type: 'varchar', length: 100, name: 'key' })
  key: string;                  // Logical name the extension looks up (e.g. "product.price")

  @Column({ type: 'text' })
  selector: string;             // CSS selector string

  @Column({ type: 'text', nullable: true })
  description?: string | null;  // Optional notes

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;            // Disable a selector without deleting it

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
```

## How it works

The browser extension does not hardcode CSS selectors. Instead, on startup (or on a scheduled refresh) it fetches the active selectors for its `ExtensionContext` from the API. This means:

- A selector that breaks because the target site changed its HTML can be fixed server-side immediately.
- No extension update submission or user-facing reinstall is required.

## Fields

| Field                    | Description                                                                               |
|--------------------------|-------------------------------------------------------------------------------------------|
| `id`                     | Auto-increment primary key                                                                |
| `extensionContextId`     | The `ExtensionContext` this selector belongs to                                           |
| `key`                    | Stable identifier the extension uses to look up this selector (e.g. `"checkout.total"`)  |
| `selector`               | CSS selector string the extension passes to `document.querySelector` / `querySelectorAll` |
| `description`            | Optional human-readable note about what this selector targets                             |
| `isActive`               | Set to `false` to disable the selector without deleting history                           |
| `createdAt` / `updatedAt`| Audit timestamps                                                                          |

## Typical workflow

1. **Onboarding** — create selector records for each DOM element the extension needs to interact with on the target site.
2. **Site HTML changes** — update `selector` on the server; the extension picks up the new value on its next fetch.
3. **Temporary disable** — set `isActive = false` to stop the extension from using a selector without losing the record.

## Example record

```json
{
  "extensionContextId": 42,
  "key": "checkout.total",
  "selector": ".order-summary .total-price",
  "description": "Final price shown at checkout",
  "isActive": true
}
```

See also: `docs/ExtensionContext.md` for the owning context entity.
