import { Algolia } from './utils/algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const incrementStoreViewCount = functions.https.onCall((change) => {
  const data = change.after.data();
  return algolia.saveRecord({
    indexName: 'stores',
    isUpdate: true,
    data: {
      viewCount: +1,
      ...data,
    },
  });
});
