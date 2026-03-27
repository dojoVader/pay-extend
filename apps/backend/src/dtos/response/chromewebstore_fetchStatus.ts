export class DistributionChannel {
  deployPercentage: number;
  crxVersion: string;
}

export class PublishedItemRevisionStatus {
  state: string;
  distributionChannels: DistributionChannel[];
}

export class ChromeWebstoreFetchStatusResponse {
  name: string;
  itemId: string;
  publicKey: string;
  publishedItemRevisionStatus: PublishedItemRevisionStatus;
}
