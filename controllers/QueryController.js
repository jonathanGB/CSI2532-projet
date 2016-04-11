var QueryModel = require('../models/QueryModel');

exports.Query1 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery1((data) => {
    data.queryTitle = 'Query 1';
    console.log(data);
    res.render('API_Query', data);
  });
};

exports.Query2 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery2((data) => {
    data.queryTitle = 'Query 2';
    res.render('API_Query', data);
  });
};

exports.Query3 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery3((data) => {
    data.queryTitle = 'Query 3';
    res.render('API_Query', data);
  });
};

exports.Query4 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery4((data) => {
    data.queryTitle = 'Query 4';
    res.render('API_Query', data);
  });
};

exports.Query5 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery5((data) => {
    data.queryTitle = 'Query 5';
    res.render('API_Query', data);
  });
};

exports.Query6 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery6((data) => {
    data.queryTitle = 'Query 6';
    res.render('API_Query', data);
  });
};

exports.Query7 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery7((data) => {
    data.queryTitle = 'Query 7';
    res.render('API_Query', data);
  });
};

exports.Query8 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery8((data) => {
    data.queryTitle = 'Query 8';
    res.render('API_Query', data);
  });
};

exports.Query9 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery9((data) => {
    data.queryTitle = 'Query 9';
    res.render('API_Query', data);
  });
};

exports.Query10 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery10((data) => {
    data.queryTitle = 'Query 10';
    res.render('API_Query', data);
  });
};

exports.Query11 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery11((data) => {
    data.queryTitle = 'Query 11';
    res.render('API_Query', data);
  });
};

exports.Query12 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery12((data) => {
    data.queryTitle = 'Query 12';
    res.render('API_Query', data);
  });
};

exports.Query13 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery13((data) => {
    data.queryTitle = 'Query 13';
    res.render('API_Query', data);
  });
};

exports.Query14 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery14((data) => {
    data.queryTitle = 'Query 14';
    res.render('API_Query', data);
  });
};

exports.Query15 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery15((data) => {
    data.queryTitle = 'Query 15';
    res.render('API_Query', data);
  });
};
