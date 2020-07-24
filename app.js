const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {quote: null, error: null});
})


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).render('notfound');
});

app.post('/', function (req, res) {
  let quoteId = req.body.quoteId;

	//let url = `http://127.0.0.1:3000/data-with-image.json`
	//let url = `https://jsonplaceholder.typicode.com/Posts/${quoteId}`
	let url = `https://gist.githubusercontent.com/ganeshan8/9185e97f412f0b0146e7ab67af298754/raw/3f6581025defb41b5f1fdccb7864b7de5b97cec5/%25C4%25ABmages.json/`
	// let url = `https://gist.githubusercontent.com/ganeshan8/0d23b466fc93cd83d8c34b54fc81a3de/raw/a273b0e81606b9d92085d2fdee87c9064559e369/test.json`
  
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {quote: null, error: 'Error  111, please try again'});
    } else {

      let data = JSON.parse(body);
		console.log(data);
      if(data == undefined){
        res.render('index', {quote: null, error: 'Error 2222, please try again'});
      } else {
		  var items = [];
          $.each(data, function(index, value){
              items.push(value);
          });
          var col = [];
          for (var i = 0; i<items.length;i++){
              for (var key in items[i]){
                  if (col.indexOf(key)===-1){
                      col.push(key);
                  }
              }
          }
          var table = document.createElement("table");
          var tr = table.insertRow(-1);
          for (var i =0; i<col.length;i++){
              var th = document.createElement("th");
              th.innerHTML=col[i];
              tr.appendChild(th);
          }
          for (var i = 0; i<items.length;i++){
              tr=table.insertRow(-1);
              for (var j=0; j<col.length;j++){
                  var tabCell=tr.insertCell(-1);
                  if (j === 2) {      // The last JSON column has image urls.

                            // Create an <img> element show the images.
                            var img = document.createElement('img');
                            img.src = arrItems[i].Image;   // The image source from JSON array.
                            tabCell.appendChild(img);
                        }
                        else
                            tabCell.innerHTML = arrItems[i][col[j]];
              }
          }
          var divContainer = document.getElementById("showData");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
			for (i in data) {
				x += data[i];
			}
			
			x = data[i].ID;
			y = data[i].Name;
            z = data[i].Image;
			
			
          
			
       let quoteText = `ID: ${x} Name: ${y} Image: ${z}`;
       res.render('index', {quote: quoteText, error: null});
	  }
      
    }
  });
})

app.listen(3000, function () {
  console.log('Quotes app listening on port 3000!')
})