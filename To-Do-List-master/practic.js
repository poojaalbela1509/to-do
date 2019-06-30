function getFrequencies(arr) {
	let temp=arr[0]
	count=0;
	arr2=[]
	for(var i=0;i<arr.length;i++){
		if(temp==arr[i]){
			count++;
		}
		else{
			arr.push(arr[i])	
		}
	}
	obj={};
	obj[temp]=count;
	
	for(var j=0;j<arr2.length;j++){
		cnt=0;
		for(var k=0;k<arr.length;k++){
			if(arr2[j]==arr[k]){
				cnt++;
			}
		}
		obj[arr2[j]]=cnt;
	}
	
	return obj;
	
}

console.log(getFrequencies(["A", "B", "A", "A", "A"]))