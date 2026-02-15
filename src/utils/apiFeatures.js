class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.filterObj = {};
    this.page = 1;
    this.limit = 10;
    this.skip = 0;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Convert boolean strings
    if (queryObj.completed !== undefined) {
      queryObj.completed = queryObj.completed === "true";
    }

    this.filterObj = queryObj;
    this.query = this.query.find(queryObj);

    return this;
  }

  paginate() {
    this.page = this.queryString.page * 1 || 1;
    this.limit = this.queryString.limit * 1 || 10;
    this.skip = (this.page - 1) * this.limit;

    this.query = this.query.skip(this.skip).limit(this.limit);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
}

module.exports = APIFeatures;
