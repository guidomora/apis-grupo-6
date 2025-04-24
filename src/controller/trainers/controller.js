const getTrainers = (req, res) => {
    res.json([{ id: 1, name: 'Guido' }]);
  };
  
  module.exports = {
    getTrainers,
  };
  