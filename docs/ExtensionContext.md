# ExtensionContext Service

The `ExtensionContext` service manages the lifecycle and metadata of browser/system extensions within the platform. It stores essential information such as name, description, public key, logo, and activation status.

### Entity: `ExtensionContext`

```ts
@Entity()
export class ExtensionContext {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() @IsString() @IsNotEmpty()
  extensionItemId: string;        // Unique identifier from the extension marketplace/store

  @Column() @IsString() @IsNotEmpty()
  extensionName: string;           // Display name of the extension

  @Column() @IsString() @IsNotEmpty()
  extensionDescription: string;    // Short description of what the extension does

  @Column({ type: 'varchar', length: 30 })
  status: string;                  // e.g., "pending", "approved", "rejected", "disabled"

  @Column({ nullable: true })
  publicKey: string;               // Public key for verification (optional during registration)

  @Column({ name: 'extension_logo' })
  extensionLogo: string;           // URL or base64 string of the extension icon

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: true })
  @IsBoolean()
  active: boolean;                 // Soft-delete / toggle visibility
}

```

## ExtensionContext Service – Core Tasks

### 1. Add Extension
Create a new extension record with all required metadata (extensionItemId, name, description, logo, public key, etc.).

### 2. Delete Extension
Remove an extension from the system (supports soft delete by setting `active = false` or permanent hard delete).

### 3. Get All Extensions
Retrieve the full list of extensions with optional filtering (by status, active state, search term) and pagination support.
