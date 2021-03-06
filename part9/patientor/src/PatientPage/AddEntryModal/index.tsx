import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NewEntryFormFields } from "../../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntryFormFields) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`${error}`}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
