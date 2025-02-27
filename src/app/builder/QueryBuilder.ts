import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuey: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuey = modelQuery;
    this.query = query;
  }

  //search
  searchQuery(searchFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuey = this.modelQuey.find({
        $or: searchFields.map((fields) => ({
          [fields]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }

  // sortBy
  sortBy() {
    const sortBy = (this?.query?.sortBy as string) || '-createAt';
    if (sortBy) {
      this.modelQuey = this.modelQuey.sort(sortBy as string);
    }
    return this;
  }

  //sortOrder
  sortOrder() {
    const sortOrder = (this?.query?.sortOrder as string) || 'asc';
    if (sortOrder) {
      this.modelQuey = this.modelQuey.sort({
        createdAt: sortOrder === 'asc' ? 1 : -1,
      });
    }
    return this;
  }

  // filter
  filter() {
    const filter = this?.query?.filter as string;
    if (filter) {
      this.modelQuey = this.modelQuey.find({ _id: filter });
    }
    return this;
  }
}

export default QueryBuilder;
