import init, { get_local_sun_info, get_local_star_infos, get_time_related } from "../pkg/wasm_utils.js";
init();


// document.querySelector('#clickme').addEventListener("click", () => {
//   document.getElementById('output').value = 
//     run(document.getElementById('data').value, 
//         document.getElementById('password').value, 
//         document.getElementById('salt').value, 
//         document.getElementById('operation').value,
//         document.getElementById('mode').value, 
//         document.getElementById('iterations').value);
// });


document.querySelector('#execute-star').addEventListener("click", () => {
  let timeString = document.getElementById('hour-star').value; // Example time string

  // Split the time string into an array of [HH, MM, SS]
  let timeParts = timeString.split(":");

  // Assign the parts to separate variables
  let hours = parseInt(timeParts[0], 10);
  let minutes = parseInt(timeParts[1], 10);
  let seconds = parseInt(timeParts[2], 10);

  UpdateStarInfo(document.getElementById('year-star').value,
    document.getElementById('month-star').value,
    document.getElementById('day-star').value,
    hours,
    minutes,
    seconds,
    document.getElementById('latitude-star').value,
    document.getElementById('longitude-star').value,
    document.getElementById('dec-star').value,
    document.getElementById('ra-star').value,
    document.getElementById('timezone-star').value
  );
});

document.querySelector('#start-tracking-star').addEventListener("click", () => {

  if (intervalId) {
    clearInterval(intervalId); // Clear any previous interval to prevent multiple intervals running simultaneously
  }
  LoopUpdateStarInfo(); // Update immediately on click
  updateStarTable();
  intervalId = setInterval(LoopUpdateStarInfo, 1000); // Update every 1 second
  intervalId = setInterval(updateStarTable, 1000); // Update every 1 second

});

function LoopUpdateStarInfo() {
  datetime = new Date();
  let tz = datetime.getTimezoneOffset() / 60.0;
  tz *= -1;

  UpdateStarInfo(datetime.getFullYear(),
    datetime.getMonth() + 1,
    datetime.getDate(),
    datetime.getHours(),
    datetime.getMinutes(),
    datetime.getSeconds(),
    document.getElementById('latitude-star').value,
    document.getElementById('longitude-star').value,
    document.getElementById('dec-star').value,
    document.getElementById('ra-star').value,
    tz);
}


function updateStarTable() {
  datetime = new Date();
  let tz = datetime.getTimezoneOffset() / 60.0;
  tz *= -1;
  let year = datetime.getFullYear();
  let month = datetime.getMonth() + 1;
  let day = datetime.getDate();
  let hours = datetime.getHours();
  let minutes = datetime.getMinutes();
  let seconds = datetime.getSeconds();
  let latitude = document.getElementById('latitude-star').value;
  let longitude = document.getElementById('longitude-star').value;
  const ra_list = [
    {
      "Sirius": ["06:45:09.0", "-16:43:06"],
      "Canopus": ["06:3:57.10988", "-52:41:44.3810"],
      "Rigel": ["05:14:32.049", "-08:12:14.78"],
      "Vega": ["18:36:56.33635", "38:47:01.2802"],
      "Procyon": ["07:40:33.5", "05:09:44.5"],
      "Alpha Centauri A": ["14:39:36.49400", "-60:50:02.3737"],
      "Betelgeuse": ["05:55:10.30536", "07:24:25.4304"],
      "Antares": ["16:29:24.45970", "-26:25:55.2094"],
      "Spica": ["13:25:11.579", "-11:09:40.75"],
      "Acrux": ["12:26:35.89522", "-63:05:56.7343"],
      "Pollux": ["07:45:18.94987", "28:01:34.3160"],
      "Arcturus": ["14:15:39.7", "19:10:56"],
      "Aldebaran": ["04:35:55.23907", "16:30:33.4885"],
      "Fomalhaut": ["22:57:39.0465", "-29:37:20.050"],
      "Polaris": ["02:31:49.09", "89:15:50.8"]
    }];
  // Get the table body element
  const tbody = document.querySelector("#starTable tbody");
  // Clear existing rows
  tbody.innerHTML = '';
  // Iterate over each star in the ra_list
  ra_list.forEach(starObject => {
    Object.entries(starObject).forEach(([star, coords]) => {

      const ra = coords[0];
      const dec = coords[1];
      const [alt, az] = get_local_star_infos(year, month, day, hours, minutes, seconds, latitude, longitude, dec, ra, tz);
      const row = document.createElement("tr");
      // Update the content of the row
      row.innerHTML = `
          <td>${star}</td>
          <td>${alt}</td>
          <td>${az}</td>
      `;
      // Append the row to the table body
      tbody.appendChild(row);
    });
  });
}


document.querySelector('#stop-tracking-star').addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId); // Clear the interval to stop updates
    intervalId = null;
  }
});





let raw_output_bytes_star;
// Format the items neatly
let formattedText_star = "";

function UpdateStarInfo(year, month, day, hours, minutes, seconds, latitude, longitude, dec, ra, timezone) {


  raw_output_bytes_star = get_local_star_infos(
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    latitude,
    longitude,
    dec,
    ra,
    timezone);

  var datetime = new Date().toLocaleString();
  if (raw_output_bytes_star[0] == "null") {
    document.getElementById('output-star').textContent = datetime + " :::  Failed the operation";
  } else {
    // Split the string at commas
    var items = raw_output_bytes_star;

    // Define labels
    var labels = [
      "Altitude     (DD:MM:SS)",
      "Azimuth      (DD:MM:SS)"
    ];

    formattedText_star = "\n";
    items.forEach(function (item, index) {
      formattedText_star += labels[index] + ":       " + item.trim() + "\n\n";
    });

    // formattedText += labels[0] + ": " + raw_output_bytes.trim() + "\n";

    document.getElementById('output-star').textContent = formattedText_star;
  }
}


let raw_output_bytes;
// Format the items neatly
let formattedText = "";
document.querySelector('#execute').addEventListener("click", () => {
  raw_output_bytes = get_local_sun_info(
    document.getElementById('year').value,
    document.getElementById('month').value,
    document.getElementById('day').value,
    document.getElementById('hour').value,
    document.getElementById('minute').value,
    document.getElementById('second').value,
    document.getElementById('latitude').value,
    document.getElementById('longitude').value,
    document.getElementById('timezone').value);

  var datetime = new Date().toLocaleString();
  if (raw_output_bytes[0] == "null") {
    document.getElementById('output2').textContent = datetime + " :::  Failed the operation";
  } else {
    // Split the string at commas
    var items = raw_output_bytes;

    // Define labels
    var labels = ["Altitude     (DD:MM:SS)",
      "Azimuth      (DD:MM:SS)",
      "Zenith       (DD:MM:SS)",
      "Hour Angle   (HH:MM:SS)",
      "Declination  (DD:MM:SS)",
      "RA           (HH:MM:SS)",
      "Sun Rise     (HH:MM:SS)",
      "Sun Set      (HH:MM:SS)",
      "Noon         (HH:MM:SS)",
      "Day Length   (HH:MM:SS)",
      "EOT          (Mins)    ",
      "Day of year            ",];

    formattedText = "\n";
    items.forEach(function (item, index) {
      formattedText += labels[index] + ":       " + item.trim() + "\n\n";
    });

    // formattedText += labels[0] + ": " + raw_output_bytes.trim() + "\n";

    document.getElementById('output2').textContent = formattedText;
  }

});


let raw_output_bytes_two;
let formattedText_two = "";
let intervalId;
var datetime;

function updateSunInfo() {
  datetime = new Date();
  let tz = datetime.getTimezoneOffset() / 60.0;
  tz *= -1;

  raw_output_bytes_two = get_local_sun_info(
    datetime.getFullYear(),
    datetime.getMonth() + 1,
    datetime.getDate(),
    datetime.getHours(),
    datetime.getMinutes(),
    datetime.getSeconds(),
    document.getElementById('latitude-2').value,
    document.getElementById('longitude-2').value,
    tz
  );

  if (raw_output_bytes_two[0] == "null") {
    document.getElementById('output-2').textContent = datetime.toLocaleString() + " :::  Failed the operation";
  } else {
    var items = raw_output_bytes_two;

    var labels = [
      "Altitude     (DD:MM:SS)",
      "Azimuth      (DD:MM:SS)",
      "Zenith       (DD:MM:SS)",
      "Hour Angle   (HH:MM:SS)",
      "Declination  (DD:MM:SS)",
      "RA           (HH:MM:SS)",
      "Sun Rise     (HH:MM:SS)",
      "Sun Set      (HH:MM:SS)",
      "Noon         (HH:MM:SS)",
      "Day Length   (HH:MM:SS)",
      "EOT          (Mins)    ",
      "Day of year            ",

    ];

    formattedText_two = "\n";
    items.forEach(function (item, index) {
      formattedText_two += labels[index] + ":       " + item.trim() + "\n\n";
    });

    document.getElementById('output-2').textContent = formattedText_two;
  }
}

document.querySelector('#start-tracking').addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId); // Clear any previous interval to prevent multiple intervals running simultaneously
  }
  updateSunInfo(); // Update immediately on click
  intervalId = setInterval(updateSunInfo, 1000); // Update every 1 second
});

document.querySelector('#stop-tracking').addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId); // Clear the interval to stop updates
    intervalId = null;
  }
});

// document.querySelector('#download').addEventListener("click", () => {
//   var bytes_to_blob = new Uint8Array(raw_output_bytes);
//   var operation = document.getElementById('operation2').value;
//   if (operation == "Encrypt") {
//     var file_name = filename + ".enom";
//   }

//   if (operation == "Decrypt") {
//     var file_name = filename.replace(/.enom/, "")
//   }
//   downloadRawBytes(file_name, bytes_to_blob);
// });


// function downloadRawBytes(file, bytes) {
//   // Create a Blob from the raw bytes
//   var blob = new Blob([bytes]);

//   // Create an invisible element
//   var element = document.createElement('a');

//   // Set the href attribute to a URL representing the Blob
//   element.setAttribute('href', URL.createObjectURL(blob));

//   // Set the download attribute to the desired filename
//   element.setAttribute('download', file);

//   // Append the element to the document body
//   document.body.appendChild(element);

//   // Simulate a click on the element to trigger the download
//   element.click();

//   // Clean up: remove the element and the temporary URL
//   document.body.removeChild(element);
//   URL.revokeObjectURL(element.href);
// }
