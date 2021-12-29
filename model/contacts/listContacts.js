import ContactModel from "../contactsScheme";

const listContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  limit = 15,
  skip = 0,
}) => {
  let sortCriteria = null;
  const total = await ContactModel.find().countDocuments();
  let result = ContactModel.find();
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortBy) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split(";").join(" "));
  }
  result = await result
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortCriteria);
  return { total, contacts: result };
};

export { listContacts };
