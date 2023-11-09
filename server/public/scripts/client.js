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
    koalaTableBody.innerHTML += (`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready_for_transfer}</td>
        <td>${koala.notes}</td>
      </tr>`
    );
  }
}
// end getKoalas

function addKoala(event) {
  event.preventDefault();
  // Get info to send to the server
  koalaname = document.getElementById('nameIn').value; 
  koalaage = document.getElementById('ageIn').value;
  koalagender= document.getElementById('genderIn').value;
  koalaready_for_transfer = document.getElementById('readyForTransferIn').value;
  koalanotes = document.getElementById('notesIn').value;
  const newKoala = {
    name: koalaname, 
    age: koalaage, 
    gender: koalagender,
    ready_for_transfer: koalaready_for_transfer,
    notes: koalanotes}

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
getKoalas();
