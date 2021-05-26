import { ref, watchEffect } from "vue";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const useStorage = (file) => {
  const error = ref(null);
  const url = ref(null);
  const progress = ref(null);

  watchEffect(() => {
    // References
    const storageRef = projectStorage.ref("images/" + file.name);
    const collectionRef = projectFirestore.collection("images");

    // Upload file
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        // Update the progress as file uploads
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        progress.value = percentage;
        console.log(progress.value);
      },
      (err) => {
        error.value = err;
      },
      async () => {
        // Get the Download url & make Firestore doc
        const dlUrl = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({ url: dlUrl, createdAt });
        url.value = dlUrl;
      }
    );
  });

  return { progress, url, error };
};

export default useStorage;
