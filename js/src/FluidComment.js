'use strict';

import React from 'react';
import { getDeepProp, getResponseDocument } from './functions.js';

class FluidComment extends React.Component {

  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  render() {
    const comment = this.props.comment;
    const subject = getDeepProp(comment, 'attributes.subject');
    const body = getDeepProp(comment, 'attributes.comment_body.processed');
    const published = getDeepProp(comment, 'attributes.status');
    const style = {
      borderLeft: '1px solid grey',
      paddingLeft: '1em',
      display: 'inline-block',
      width: '100%',
    };
    if (this.props.index > 0) {
      style['marginTop'] = '1em';
    }
    if (!published) {
      style['background'] = '#fff4f4';
    }
    return (
        <article style={style}>
          <h3>{ subject }</h3>
          <div dangerouslySetInnerHTML={{__html: body}}></div>
          <ul>
            <a href="_blank" onClick={this.deleteComment}>Delete</a>
          </ul>
        </article>
    );
  }

  deleteComment(event) {
    event.preventDefault();
    getResponseDocument(getDeepProp(this.props.comment, 'links.self.href'), {method: 'DELETE'}).then(() => {
      this.props.onDelete();
    });
  }

}

export default FluidComment;
