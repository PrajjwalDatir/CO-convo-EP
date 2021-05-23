import React from "react";
import PropTypes from "prop-types";
import useForm from "react-hook-form";
import axios from "axios";
import * as R from "ramda";
import { ChatContext } from "../reducer";
import Modal from "#/components/modal";
import Input from "#/components/input";
import Button from "#/components/button";
import { UserContext } from "#/Provider";
import { handleRequestValidationError } from "#/../utils";

function NewChannelModal({ isOpen, onClose }) {
  const [, dispatch] = React.useContext(ChatContext);
  const form = useForm();
  const [user] = React.useContext(UserContext);

  const handleNewChannelSubmit = React.useCallback(
    (data) => {
      if (!user) {
        return;
      }

      axios
        .post("/api/chat-channels", data, {
          headers: { Authorization: user.token },
        })
        .then(onClose)
        .then(() => form.setValue("name", ""))
        .then(() => form.clearError())
        .then(() => dispatch({ type: "fetch-channels" }))
        .catch(handleRequestValidationError(form));
    },
    [user, onClose, form, dispatch]
  );

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form
        className="shadow-lg"
        onSubmit={form.handleSubmit(handleNewChannelSubmit)}
        style={{ width: 400 }}
      >
        <div className="p-8 pb-4 bg-white rounded-t border-solid border-blue-500 border-t-4">
          <h1 className="text-3xl font-light mb-4">Create a Chat</h1>
          <label htmlFor="add-channel-input">
            <div className="sr-only">Chat Name</div>
            <Input
              className="w-full"
              id="add-channel-input"
              name="name"
              placeholder="Enter Chat Name"
              ref={form.register({ required: "Please enter a channel name" })}
            />
          </label>
          <span className="text-xs text-red-700 ml-1">
            {form.errors.name ? form.errors.name.message : <>&nbsp;</>}
          </span>
        </div>
        <div className="p-6 text-right bg-gray-100 rounded-b">
          <Button
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-none hover:shadow-none"
            type="button"
            onClick={onClose}
            overrideColors
          >
            Cancel
          </Button>
          <Button
            className="ml-4 bg-blue-700 hover:bg-blue-800 text-gray-100"
            type="submit"
            overrideColors
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}

NewChannelModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewChannelModal.defaultProps = {
  isOpen: false,
  onClose: R.always(),
};

export default React.memo(NewChannelModal);
