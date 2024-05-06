const getRecords = (data) => {
  return data.map(result => result.dataValues)
}

module.exports = getRecords;