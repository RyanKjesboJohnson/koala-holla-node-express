console.log( 'js' );

function getKoalas(){
  console.log('in getKoalas' );
  // axios call to server to get koalas
    // get song data from the server
    axios({
      method: 'GET',
      url: '/koalas'
    }).then(function (response) {
      console.log('Got koalas', response.data);
      renderKoalas(response.data);
    }).catch(function (error) {
      console.log('error in koala get', error);
    });
}

function renderKoalas(koalasArray) {
  // Store selector in variable
  const koalaTableBody = document.getElementById('viewKoalas');

  // Empty previous data
  koalaTableBody.innerHTML = '';
  // Add all songs to table
  console.log(koalasArray);
  for (let koala of koalasArray) {
    let buttonVisible = '';
    if (koala.ready_to_transfer === false) {
      buttonVisible = `<button onclick="preparedToTransfer(event)">Ready to Transfer</button>`
    }
    koalaTableBody.innerHTML += (`
      <tr data-koalaId='${koala.id}'>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
        ${buttonVisible}
        </td>
      </tr>`
    );
  }
}
// end getKoalas

function addKoala(event) {
  event.preventDefault();
  // Get info to send to the server
  const newKoala = {};
  newKoala.name = document.getElementById('nameIn').value; 
  newKoala.age = document.getElementById('ageIn').value;
  newKoala.gender= document.getElementById('genderIn').value;
  newKoala.ready_to_transfer = document.getElementById('readyForTransferIn').value;
  newKoala.notes = document.getElementById('notesIn').value;

  console.log('Adding koala', newKoala);

  // Send the new artist to the server as data
  axios({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function(response) {
    console.log(response.data);
    getKoalas();
  }).catch(function(error) {
    console.log('error in Koala post', error); 
    alert('Error adding koala. Please try again later.')       
  });
}

function preparedToTransfer(event){
  event.preventDefault();
  let clickedButton = event.target;
  let theTableRow = clickedButton.closest('tr');
  let koalaId = theTableRow.getAttribute('data-koalaid');
  console.log("this is the koala id:", koalaId);
  axios({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
    data: {ready_to_transfer: true}
  }). then((response) => {
    getKoalas();
  }).catch((error) => {
    console.log("PUT /koalas/:id fail:", error);
  })
}
getKoalas();
