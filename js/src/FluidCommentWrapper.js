'use strict';
import React from 'react';
import { getDeepProp, getResponseDocument } from './functions';
import FluidComment from './FluidComment';
import FluidCommentForm from './FluidCommentForm';
import InlineLoginForm from "./InlineLoginForm";

class FluidCommentWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loggedIn: this.props.loginUrl ? false : null, comments: [] };
  }

  componentDidMount() {
    this.refreshComments();
  }

  filteredCommentsUrl() {
    return `${this.props.commentsUrl}/?filter[entity_id.id]=${this.props.hostId}`
  }

  render() {
    const content = [];
    if (this.state.comments.length) {
      content.push(this.state.comments.map((comment, index) => {
        return (<FluidComment key={comment.id} comment={comment} index={index} onDelete={() => this.refreshComments()}/>);
      }));
    }
    if (this.state.loggedIn === false) {
      const onLogin = (success) => {
        this.setState({loggedIn: !!success});
        this.refreshComments();
      };
      content.push((
          <div>
            <h3>Log in to comment:</h3>
            <InlineLoginForm key="loginForm" loginUrl={this.props.loginUrl} onLogin={onLogin} />
          </div>
      ));
    }
    else if (this.props.currentNode) {
      content.push((<FluidCommentForm key="commentForm" commentTarget={this.props.currentNode} commentType={this.props.commentType} commentsUrl={this.props.commentsUrl} onSubmit={() => this.refreshComments()}/>));
    }
    return content;
  }

  refreshComments() {
    this.getAndAddComments(this.filteredCommentsUrl(), []);
  }

  getAndAddComments(commentsUrl, previous) {
    getResponseDocument(commentsUrl).then(doc => {
      const data = getDeepProp(doc, 'data');
      const nextUrl = getDeepProp(doc, 'links.next.href');
      if (nextUrl) {
        this.getAndAddComments(nextUrl, data);
      }
      else {
        this.setState({ comments: previous.concat(data) });
      }
    });
  }

}

export default FluidCommentWrapper;
