import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  const collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt", "desc");

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];

      snap.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      // Update values
      documents.value = results;
      error.value = null;
      console.log(documents.value);
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "Could not fetch the data";
    }
  );

  watchEffect((oninvalidate) => {
    oninvalidate(() => unsub);
  });

  return { documents, error };
};

export default useCollection;
