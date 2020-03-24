import React, { Component, Fragment } from "react";

import withHocs from "./ContentHOC";
import Note from "../Note/Note";

class Content extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.data.todos &&
      JSON.stringify(nextProps.data.todos) !== JSON.stringify(prevState.notes)
    ) {
      return {
        notes: nextProps.data.todos
      };
    }

    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      noteText: "",
      notes: []
    };
  }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value });
  }

  addNote() {
    const { noteText } = this.state;

    if (!noteText.length) {
      return;
    }

    this.props.add({ title: noteText });

    this.setState({ noteText: "" });
    this.textInput.focus();
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addNote();
    }
  };

  deleteNote(id) {
    this.props.destroy(id);
  }

  render() {
    const {
      data: { loading, error }
    } = this.props;

    if (loading) {
      return <p>...Loading</p>;
    }

    if (error) {
      return <p>Error!</p>;
    }

    const notes = this.state.notes.map(val => (
      <Note
        key={val.id}
        text={val.title}
        deleteMethod={() => this.deleteNote(val.id)}
      />
    ));

    return (
      <Fragment>
        {notes}

        <div className="button" onClick={this.addNote.bind(this)}>
          +
        </div>

        <input
          placeholder="Enter Notes"
          type="text"
          className="input"
          ref={input => (this.textInput = input)}
          value={this.state.noteText}
          onChange={noteText => this.updateNoteText(noteText)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
      </Fragment>
    );
  }
}

export default withHocs(Content);
