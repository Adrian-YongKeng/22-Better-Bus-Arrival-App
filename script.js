const busStopIdInput = document.getElementById("busStopId");
const arrivalTable = document.getElementById("arrivalTable");
const arrivalInfo = document.getElementById("arrivalInfo");

async function fetchBusArrival(busStopId) {
  try {
    const response = await fetch(`https://arrivelah2.busrouter.sg/?id=${busStopId}`)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error fetching bus arrival data.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function displayBusArrival(data) {
  arrivalInfo.innerHTML = '';
  //create header row
  if (data.services) {
    
    for (const service of data.services) {
      const busNo = service.no;
      const operator = service.operator;
      //create a row fro each bus
      const row = document.createElement('tr');
      //bus no.
      const busNoCol = document.createElement('td');
      busNoCol.innerHTML = busNo;
      //operator
      const operatorCol = document.createElement('td');
      operatorCol.innerHTML = operator;
      //Next Arrival
      const nextArrivalCol = document.createElement('td');
      const nextArrival = service.next;
      const subsequentCol = document.createElement('td');
      const subsequent = service.subsequent;
      const next2Col = document.createElement('td');
      const next2 = service.next2;
      const next3Col = document.createElement('td');
      const next3 = service.next3;
//time 1)nextarrival
      if (nextArrival && nextArrival.time) {
        const currentTime = new Date();
        const arrivalTime = new Date(nextArrival.time);
        const timeDiff = arrivalTime - currentTime;
        const minutesArrival = Math.floor(timeDiff / 60000);

        if (minutesArrival <= 0) {
          nextArrivalCol.innerHTML = 'Arriving';
        } else {
          nextArrivalCol.innerHTML = `${minutesArrival}min`;
        }
      }//2) subsequent
      if (subsequent && subsequent.time) {
        const currentTime = new Date();
        const arrivalTime = new Date(subsequent.time);
        const timeDiff = arrivalTime - currentTime;
        const minutesArrival = Math.floor(timeDiff / 60000);

        if (minutesArrival <= 0) {
          subsequentCol.innerHTML = 'Arriving';
        } else {
          subsequentCol.innerHTML = `${minutesArrival}min`;
        }
      }//3) next2
      if (next2 && next2.time) {
        const currentTime = new Date();
        const arrivalTime = new Date(next2.time);
        const timeDiff = arrivalTime - currentTime;
        const minutesArrival = Math.floor(timeDiff / 60000);

        if (minutesArrival <= 0) {
          next2.innerHTML = 'Arriving';
        } else {
          next2Col.innerHTML = `${minutesArrival}min`;
        }
      }//4) next3
      if (next3 && next3.time) {
        const currentTime = new Date();
        const arrivalTime = new Date(next3.time);
        const timeDiff = arrivalTime - currentTime;
        const minutesArrival = Math.floor(timeDiff / 60000);

        if (minutesArrival <= 0) {
          next3.innerHTML = 'Arriving';
        } else {
          next3Col.innerHTML = `${minutesArrival}min`;
        }
      } //add <td>cells to the row
      row.appendChild(busNoCol);
      row.appendChild(operatorCol);
      row.appendChild(nextArrivalCol);
      row.appendChild(subsequentCol)
      row.appendChild(next2Col);
      row.appendChild(next3Col);
      //add row to the arrivalInfo Table
      arrivalInfo.appendChild(row)
    }
    arrivalTable.style.display = "block";
  }
}

async function checkBusTiming() {
  const busStopId = busStopIdInput.value;
  const data = await fetchBusArrival(busStopId);
  //console.log(data);
  displayBusArrival(data);
}



//headerRow.innerHTML` <th>Bus No.</th>
//                     <th>Operator</th>
//                     <th>Next Arrival</th>`;
//arrivalInfo.appendChild(headerRow);<tr>






//row.innerHTML = ` <td>${busNo}</td>
//                  <td>${operator}</td>
//        <td>${formatNextArrival(nextArrival)}</td> `;
//      arrivalInfo.appendChild(row);
//    }
//    arrivalTable.style.display = "block";
//  }
//}
//function formatNextArrival(nextArrival) {