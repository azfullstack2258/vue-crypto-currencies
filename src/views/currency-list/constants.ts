import moment from "moment";

const TABLE_COLUMNS = [
  {
    field: 'id',
    label: 'ID',
    width: 75,
    align: 'center',
  },
  {
    field: 'name',
    label: 'Name',
    width: 150,
  },
  {
    field: 'symbol',
    label: 'Symbol',
    width: 100,
  },
  {
    field: 'slug',
    label: 'Slug',
    width: 150,
  },
  {
    field: 'dateAdded',
    label: 'Added date',
    width: 200,
    render: (date: string) => moment(date).format("YYYY-MM-DD hh:mm:ss")
  },
  {
    field: 'tags',
    label: 'Tags',
    class: 'tag',
    render: (tags: string[]) =>
      (tags.length <= 3 ? tags.slice(0, 3) : tags.slice(0, 3).concat('...')).join(', ')
  }
];

export { TABLE_COLUMNS };
