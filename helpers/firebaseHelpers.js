import { firebaseStorage, firebaseDatabase } from "../config/Config";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadTask,
  push,
  listAll,
  getMetadata,
} from "firebase/storage";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
export const snapshotToArray = (snapshot) => {
  var items = [];
  snapshot.forEach((child) => {
    items.push({
      id: child.key,
      title: child.val().fromFlight + " " + child.val().toFlight,
      content:
        "Departue Date - " +
        child.val().departureDate +
        " " +
        "\n\nArrival Date      - " +
        child.val().ArrivalDate,
    });
  });
  return items;
};

export const convertCardImageArray = async (res) => {
  var imageArray = [];
  await Promise.all(
    res.items.map(async (itemRef) => {
      const storageRef = ref(firebaseStorage, itemRef.fullPath);
      const metadata = getMetadata(storageRef);
      const approvedStatus = (await metadata).customMetadata;
      const url = await getDownloadURL(storageRef);
      imageArray.push({
        id: itemRef.name,
        title: itemRef.name,
        status: approvedStatus.approved,
        content: (
          <Card style={{ width: 350 }}>
            <Card.Cover source={{ uri: url }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        ),
      });
    })
  );
  return imageArray;
};
