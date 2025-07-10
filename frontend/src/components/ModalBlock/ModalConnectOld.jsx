import { connect } from "react-redux";
import { closeModal } from "../../redux/modalSlice";

import ModalBlock from "./ModalBlock";

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.isOpen,
    title: state.modal.title,
    content: state.modal.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBlock);