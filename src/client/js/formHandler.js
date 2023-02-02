function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    if(Client.checkURL(formText)) {
    console.log(" - Form Submitted - ")

    postData('http://localhost:8000/postData', {url: formText})

    .then(function(res) {
      document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
      document.getElementById("score").innerHTML = 'Score: '+polarityChecker(res.score_tag);
      document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
      document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
      document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
    })
    } else {
      alert('Seems like an invalid URL, please try with a valid URL.');
    }
}

const postData = async (url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

const polarityChecker = (polarity) => {
  let content;
  switch (polarity) {
    case "P+":
      content = "Very Positive";
      break;
    case "P":
      content = "Fairly Positive";
      break;
    case "NEU":
      content = "Neutral";
      break;
    case "N":
      content = "Negative";
      break;
    case "N+":
      content = "Very Negative";
      break;
    case "NONE":
      content = "Without Sentiment";
      break;
    default:
      content = "Not found...";
  }
  return content.toUpperCase();;
}

export { handleSubmit, polarityChecker };