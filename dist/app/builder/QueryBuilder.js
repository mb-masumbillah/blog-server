"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuey = modelQuery;
        this.query = query;
    }
    //search
    searchQuery(searchFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
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
        var _a;
        const sortBy = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || '-createAt';
        if (sortBy) {
            this.modelQuey = this.modelQuey.sort(sortBy);
        }
        return this;
    }
    //sortOrder
    sortOrder() {
        var _a;
        const sortOrder = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortOrder) || 'asc';
        if (sortOrder) {
            this.modelQuey = this.modelQuey.sort({
                createdAt: sortOrder === 'asc' ? 1 : -1,
            });
        }
        return this;
    }
    // filter
    filter() {
        var _a;
        const filter = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.filter;
        if (filter) {
            this.modelQuey = this.modelQuey.find({ _id: filter });
        }
        return this;
    }
}
exports.default = QueryBuilder;
