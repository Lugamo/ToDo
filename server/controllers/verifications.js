function validate(req, res) {
  body = req.body;
  const taskData = {
    title: checkTitle(body.title, res),
    description: body.description || '',
    assignedTo: checkAssignTo(body.assignedTo, res),
    status: checkStatus(body.status, res)
  }

  if (taskData.title === null || taskData.status === null) {
    return null
  };

  return taskData;
}

function checkAssignTo(assignedTo, res) {
  if (Array.isArray(assignedTo)){
    return assignedTo
  } else {
    return [];
  }
}
function checkTitle(title, res) {
  if (title){
    return title
  } else {
    res.status(400).send({
      msg: 'Not given title',
    });
    return null;
  }
}

function checkStatus(status, res) {
  const arrayStatus = ['open', 'in-progress', 'completed', 'archived']
  if (arrayStatus.includes(status)){
    return status.toLowerCase();
  } else {
    res.status(400).send({
      msg: `Bad status value ${status}`
    });
    return null;
  }
}

module.exports = {
  validate,
};
