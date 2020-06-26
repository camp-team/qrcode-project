import { Algolia } from './utils/algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const incrementStoreViewCount = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    console.log(data);
    console.log(data.viewCount);
    return algolia.saveRecord({
      indexName: 'stores',
      isUpdate: true,
      data: {
        viewCount: data.viewCount++,
        ...data,
      },
    });
  });
