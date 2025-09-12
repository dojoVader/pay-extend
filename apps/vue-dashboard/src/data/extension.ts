export type ChromeExtensionItem = {
  id: string;
  extensionItemId: string;
  extensionName: string;
  extensionDescription: string;
  status: 'active' | 'inactive';
  version: string;
  publicKey?: string;
  extensionLogoUrl?: string;
  installedAt: Date;
  updatedAt: Date;
};

export const ProductService = {
  getProductsData(): ChromeExtensionItem[] {
    return [
      {
        id: '1',
        extensionItemId: 'ext-001',
        extensionName: 'AdBlock Plus',
        extensionDescription:
          'Blocks ads on websites for a cleaner browsing experience.',
        status: 'active',
        version: '3.11.2',
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...',
        extensionLogoUrl:
          'https://cdn-icons-png.flaticon.com/512/152/152759.png',
        installedAt: new Date('2023-01-15T10:00:00Z'),
        updatedAt: new Date('2024-05-20T12:30:00Z'),
      },
      {
        id: '2',
        extensionItemId: 'ext-002',
        extensionName: 'Grammarly',
        extensionDescription:
          'Enhances your writing by checking grammar and spelling.',
        status: 'active',
        version: '14.2.0',
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...',
        extensionLogoUrl:
          'https://cdn-icons-png.flaticon.com/512/152/152759.png',
        installedAt: new Date('2023-03-22T14:45:00Z'),
        updatedAt: new Date('2024-06-10T09:15:00Z'),
      },
      {
        id: '3',
        extensionItemId: 'ext-003',
        extensionName: 'LastPass',
        extensionDescription:
          'A password manager that saves your passwords and gives you secure access from every computer and mobile device.',
        status: 'pending',
        version: '4.5.3',
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...',
        extensionLogoUrl:
          'https://cdn-icons-png.flaticon.com/512/152/152759.png',
        installedAt: new Date('2022-11-05T08:20:00Z'),
        updatedAt: new Date('2024-04-18T11:00:00Z'),
      },
      {
        id: '4',
        extensionItemId: 'ext-004',
        extensionName: 'Honey',
        extensionDescription:
          'Finds and applies coupon codes automatically at checkout.',
        status: 'active',
        version: '12.1.0',
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQ...',
        extensionLogoUrl:
          'https://cdn-icons-png.flaticon.com/512/152/152759.png',
        installedAt: new Date('2023-06-30T16:10:00Z'),
        updatedAt: new Date('2024-05-25T13:40:00Z'),
      },
    ];
  },

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },
};
