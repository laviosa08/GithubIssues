var express 	= require('express');
var port 		= process.env.PORT || 3000;
var bodyParser 	= require('body-parser');
var github 		= require('octonode');
var cors 		= require('cors');

const app 		= express()

app.use(cors());

app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());


app.post('/', function (req, res) {
	var repoUrl = req.body.repoUrl;
	repoUrl = repoUrl.split('com/')[1]
	var client = github.client();
  	var repo = client.repo(repoUrl);
 
  	async function getissues () {
  		var total 			= 0;
	  	var within24Hours 	= 0;
	  	var within7Days 	= 0;
	  	var above7Days 		= 0;
	  	var issueInfo 		= [];
	  	var result			= [];
	  	var i=1;
	  	while(1){
	  		result = await repo.issuesAsync({
	  			page: i,
  				per_page: 100,
			  	filter: 'assigned',
			  	state: 'open',
			  	sort: 'created'
		  	})

		  	if(result[0].length==0){
		  		break;
		  	}

		  	var currentTimestamp = new Date().getTime();
		  	result[0].forEach(function(issue){
		  		var checkUrl = issue.html_url;
		  		if(!checkUrl.includes("pull")){
			  		var issueTimestamp = new Date(issue.created_at).getTime();
			  		if((currentTimestamp-issueTimestamp)/3600000 <= 24){
			  			within24Hours++;
			  		}
			  		else if(((currentTimestamp-issueTimestamp)/3600000)>24 && ((currentTimestamp-issueTimestamp)/3600000)<168){
			  			within7Days++;
			  		}
			  		else{
			  			above7Days++;
			  		}
			  	}	
		  	})
		  	total = within24Hours+within7Days+above7Days ;
		  	i++;
	  	}
	  	issueInfo.push({"total":total,"within24Hours":within24Hours,"within7Days":within7Days,"above7Days":above7Days});
	 	return issueInfo;
	}

	getissues()
		.then(data =>res.json(data))
		.catch(err=>res.send(err));
  	
})

app.listen(port);