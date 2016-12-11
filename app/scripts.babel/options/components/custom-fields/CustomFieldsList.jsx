import React, { Component, PropTypes } from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

import { shapeOfCustomField } from '../../prop-types';

const DragHandle = SortableHandle(() => (
  <button type="button" className="btn btn-xs btn-default">
    <i className="glyphicon glyphicon-sort" />
  </button>
));

const SortableItem = SortableElement(({ customField, index, onDelete }) => (
  <div className="well well-sm">
    <strong>{customField.name}</strong>
    <div className="pull-right">
      <div className="btn-group">
        <DragHandle />
        <button type="button" className="btn btn-xs btn-default">
          <i className="glyphicon glyphicon-edit" /> Edit
        </button>
        <button type="button" className="btn btn-xs btn-default"onClick={() => onDelete(index)}>
          <i className="glyphicon glyphicon-trash" />
        </button>
      </div>
    </div>
    <dl className="dl-horizontal">
      <dt>Type</dt>
      <dd>{customField.type}</dd>
      <dt>Match</dt>
      <dd>{customField.match.join(', ')}</dd>
      {customField.template && <dt>Template</dt>}
      {customField.template && <dd>{customField.template}</dd>}
      {customField.min && <dt>Minimum Value</dt>}
      {customField.min && <dd>{customField.min}</dd>}
      {customField.max && <dt>Maximum Value</dt>}
      {customField.max && <dd>{customField.max}</dd>}
    </dl>
  </div>
));

const SortableCustomFieldsList = SortableContainer(({ customFields, onDelete }) => {
  const customFieldItems = customFields.map((item, index) => (
    <SortableItem
      key={index}
      index={index}
      customField={item}
      onDelete={onDelete}
    />
  ));

  return (
    <div>{customFieldItems}</div>
  );
});

class CustomFieldsList extends Component {
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    const sortedCustomFields = arrayMove(this.props.customFields, oldIndex, newIndex);
    this.props.onSort(sortedCustomFields);
  }

  render() {
    return (
      <SortableCustomFieldsList
        customFields={this.props.customFields}
        onDelete={this.props.onDelete}
        onSortEnd={this.onSortEnd}
        useDragHandle
        useWindowAsScrollContainer
      />
    );
  }
}

CustomFieldsList.propTypes = {
  customFields: PropTypes.arrayOf(shapeOfCustomField),
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default CustomFieldsList;