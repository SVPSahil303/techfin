function cal(){
					if(!checkAll())
						return;

					var depositType=document.f1.depositType.value;
					if(depositType == "fd" && document.f1.freq.value.length!=0){
						var amt=parseFloat(document.f1.amt.value);
						var rate=parseFloat(document.f1.rate.value);
						var year=parseInt(document.f1.years.value);
						var freq=parseInt(document.f1.freq.value);

						var maturity=amt*Math.pow((1+((rate/100)/freq)), freq*year);
						let interest = Math.round(maturity - amt);
						document.getElementById("maturity").innerText=Math.round(maturity);
						document.getElementById("interest").innerText=interest;

					}else if(depositType == "rd" && document.f1.freq.value.length!=0){
						var amt=parseFloat(document.f1.amt.value);
						var rate=parseFloat(document.f1.rate.value);
						var year=parseInt(document.f1.years.value);
						var freq=parseInt(document.f1.freq.value);

						var months=year*12;
						var maturity=0;
						for(var i=1; i<=months;i++){
              maturity += amt * Math.pow((1 + (rate / 100) / freq), freq * ((months - i + 1) / 12));
						}
						let interest = Math.round(maturity - amt);
						document.getElementById("maturity").innerText=Math.round(maturity);
						document.getElementById("interest").innerText=interest;
					}else{
						alert("Select all dropdowns");
					}
			}

			function checkAll(){
					if(checkType() && checkAmt() && checkYears() && checkRate() && checkFreq())
						return true;
					else
						return false;
			}
			function checkType(){
					if(document.f1.depositType.value.length == 0){
						document.getElementById("depositTypeErr").innerText="Select a deposit type";
						return false;
					}else{
						document.getElementById("depositTypeErr").innerText="";
						return true;
					}
			}

			function checkAmt(){
					if(isNaN(document.f1.amt.value) || document.f1.amt.value.length==0){
						document.getElementById("amtErr").innerText=" * Amount required and should be a number";
						return false;
					}else{
						document.getElementById("amtErr").innerText="";
						return true;
					}
			}

			function checkYears(){
					if(isNaN(document.f1.years.value) || document.f1.years.value.length==0){
						document.getElementById("yearsErr").innerText=" * Year required and should be a number";
						return false;
					}else{
						document.getElementById("yearsErr").innerText="";
						return true;
					}
			}

			function checkRate(){
					if(isNaN(document.f1.rate.value) || document.f1.rate.value.length==0){
						document.getElementById("rateErr").innerText=" * Interest required and should be a number";
						return false;
					}else{
						document.getElementById("rateErr").innerText="";
						return true;
					}
			}

			function checkFreq(){
					if(document.f1.freq.value.length == 0){
						document.getElementById("freqErr").innerText=" * Select a compounding freq.";
						return false;
					}else{
						document.getElementById("freqErr").innerText="";
						return true;
					}
			}