
var g_ReactantList = [];
var g_ProductList = [];
var allGensoList = [];
var allKeisu = [];

function ExecuteMiteiKeisuHou() {

	g_ReactantList = [];
	g_ProductList = [];
	allGensoList = [];
	allKeisu = [];

	var elem_value;
	
	//反応物をリストに格納
	elem_value = document.getElementById("ReactantTextBox1").value;
	if(elem_value != ""){
		g_ReactantList.push(elem_value)
	}
	elem_value = document.getElementById("ReactantTextBox2").value;
	if(elem_value != ""){
		g_ReactantList.push(elem_value)
	}
	elem_value = document.getElementById("ReactantTextBox3").value;
	if(elem_value != ""){
		g_ReactantList.push(elem_value)
	}
	elem_value = document.getElementById("ReactantTextBox4").value;
	if(elem_value != ""){
		g_ReactantList.push(elem_value)
	}
	elem_value = document.getElementById("ReactantTextBox5").value;
	if(elem_value != ""){
		g_ReactantList.push(elem_value)
	}
	
	
	//生成物をリストに格納
	elem_value = document.getElementById("ProductTextBox1").value;
	if(elem_value != ""){
		g_ProductList.push(elem_value)
	}
	elem_value = document.getElementById("ProductTextBox2").value;
	if(elem_value != ""){
		g_ProductList.push(elem_value)
	}
	elem_value = document.getElementById("ProductTextBox3").value;
	if(elem_value != ""){
		g_ProductList.push(elem_value)
	}
	elem_value = document.getElementById("ProductTextBox4").value;
	if(elem_value != ""){
		g_ProductList.push(elem_value)
	}
	elem_value = document.getElementById("ProductTextBox5").value;
	if(elem_value != ""){
		g_ProductList.push(elem_value)
	}

	GetAllGensoList();
	
	//デバッグ用
	//Print2DimGyoretu(allKeisu);

}


function GetAllGensoList(){
	var array1;
	var array2
	var genso;
	var keisu;
	
	//反応物を行列に格納
	for(var i=0; i<g_ReactantList.length; i++){
		array1 = g_ReactantList[i].split("_");
		
		//元素の化学式の記述がおかしかったとき
		if((array1.length % 2) != 0){
			return -1;
		}
		
		
		for(var j=0; j<array1.length; j++){
			if((j % 2) == 0){
				genso = array1[j];
				if(!allGensoList.includes(genso)){
					array2 = [];
					
					allGensoList.push(genso);
				}
			}
		}
		
	}
	

	//生成物を行列に格納
	for(var i2=0; i2<g_ProductList.length; i2++){
		array1 = g_ProductList[i2].split("_");
		
		//元素の化学式の記述がおかしかったとき
		if( (array1.length % 2) != 0){
			return -1;
		}
		
		
		for(var j2=0; j2<array1.length; j2++){
			if((j2 % 2) == 0){
				genso = array1[j2];
				if(!allGensoList.includes(genso)){
					array2 = [];
					allGensoList.push(genso);
				}
			}
		}
		
	}
	
	var x_dim = g_ReactantList.length + g_ProductList.length;
	var y_dim = allGensoList.length;
	allKeisu = InitKeisu(x_dim, y_dim);
	allKeisu = SetKeisu();
	
	var result = SearchKeisuByBlock();
	
	if(result != null){
		var spanElem = document.getElementById("SuccessKeisu");
		//計算結果のSpanをクリア
		while(spanElem.firstChild != null){ spanElem.removeChild(spanElem.firstChild); }
		spanElem.innerHTML = "";
		
		for(var i3=0; i3<g_ReactantList.length; i3++){
			
			var keisuSpan = document.createElement("span");
			keisuSpan.innerHTML = '　';

			keisuSpan.innerHTML += result[i3];
			keisuSpan.style.color = "red";
			
			var reactSpan = document.createElement("span");
			reactSpan.innerHTML = g_ReactantList[i3];
			reactSpan.style.color = "black";
			
			if(i3 != 0){
				var plusSpan = document.createElement("span");
				plusSpan.innerHTML = "　+　";
				plusSpan.style.color = "black";
				spanElem.appendChild(plusSpan);
			}
			
			spanElem.appendChild(keisuSpan);
			spanElem.appendChild(reactSpan);
			
		}
		
		eqSpan = document.createElement("span");
		eqSpan.innerHTML = "　=　";
		eqSpan.style.color = "black";
		
		spanElem.appendChild(eqSpan);
		
		for(var i4=0; i4<g_ProductList.length; i4++){
			var keisuSpan = document.createElement("span");
			keisuSpan.innerHTML = '　';
			keisuSpan.innerHTML += result[g_ReactantList.length+i4];
			keisuSpan.style.color = "red";
			
			var productSpan = document.createElement("span");
			productSpan.innerHTML = g_ProductList[i4];
			productSpan.style.color = "black";
			
			if(i4 != 0){
				var plusSpan = document.createElement("span");
				plusSpan.innerHTML = "　+　";
				plusSpan.style.color = "black";
				spanElem.appendChild(plusSpan);
			}
			
			spanElem.appendChild(keisuSpan);
			spanElem.appendChild(productSpan);
		}
	}
}

function Print2DimGyoretu(gyoretu){
	var outputElem = document.getElementById("ForDebug1");
	var resultStr = "[ <br>";
	
	for(var j=0; j<gyoretu.length; j++){
		resultStr += "[ ";
		for(var k=0; k<gyoretu[j].length; k++){
				resultStr  += gyoretu[j][k];
				
			if( (k+1) < gyoretu[j].length ){
				resultStr  += ", "
			}
		}
		
		resultStr += " ]";
		resultStr += "<br>";
	}
	
	resultStr += "] <br>";
	outputElem.innerHTML = resultStr;
}

function InitKeisu(x_dimension, y_dimension){
	var result = [];
	var array;
	for(var i=0; i<y_dimension; i++){
		array = [];
		result.push(array);
		for(var j=0; j<x_dimension; j++){
			array.push(0.0);
		}
	}
	
	return result;
}

function SetKeisu(){
	var genso;
	var array_val;
	
	for(var i=0; i<allGensoList.length; i++){
		genso = allGensoList[i];
		for(j=0; j<g_ReactantList.length; j++){
			array_val = g_ReactantList[j].split("_");
			for(var k=0; k<array_val.length; k++){
				if(genso == array_val[k]){
					allKeisu[i][j] = parseInt(array_val[k+1]);
				}
			}
		}
		
		for(var j2=0; j2<g_ProductList.length; j2++){
			array_val = g_ProductList[j2].split("_");
			for(var k2=0; k2<array_val.length; k2++){
				if(genso == array_val[k2]){
					allKeisu[i][g_ReactantList.length+j2] = -1.0 * parseInt(array_val[k2+1]);
				}
			}
		}
	}
	
	return allKeisu
}

const VAL_RANGE_A = 1;
const VAL_RANGE_B = 2;
const VAL_RANGE_C = 3;

const RANGE_KIND_NUM = 3;
const RANGE_VOL = 11;

function SearchKeisuByBlock(){

	var valueList = [1, 2, 3]
	var loopCount = g_ReactantList.length+g_ProductList.length;
	var blockCombiList = [];
	var combiCount = Math.pow(RANGE_KIND_NUM, loopCount);
	blockCombiList = CreateCombinationList(loopCount, valueList);
	
	

	var valRangePattern;
	var valRange;
	var keisuList;
	var keisuCount = g_ReactantList.length+g_ProductList.length;
	var startVal;
	var successFlg = false;
	var successKeisu;
	
	keisuList = new Array(keisuCount);
	startVal = new Array(keisuCount);
	
	for(var k3=0; k3<keisuCount; k3++){
	 keisuList[k3] = 1.0;
	}
	
	
	var VolList = [];
	var maxVol = 1;
	for(var k4=0; k4<keisuCount; k4++){
		VolList.push(RANGE_VOL-1);
		maxVol = maxVol * RANGE_VOL;
	}
	var IdxPatternList = CreateArrayIdxListToMaxIdx(keisuCount, VolList, maxVol);
	
loop1:	for(var idx=0; idx<combiCount; idx++){
		
		valRangePattern = FetchOneBlock(blockCombiList, idx, loopCount);
		for(var j=0; j<valRangePattern.length; j++){
			valRange = valRangePattern[j];
			if(valRange == VAL_RANGE_A){
				startVal[j] = 1;
			}else if(valRange == VAL_RANGE_B){
				startVal[j] = 11;
			}else if(valRange == VAL_RANGE_C){
				startVal[j] = 21;
			}
			
		}
		
		
		keisuList = MakeKeisuCombiListByBlock(startVal, valRangePattern.length, RANGE_VOL);
		for(var k4=0; k4<maxVol; k4++){
			
			//係数候補の1つを取得,value2に格納
			var value2 = keisuList;
			for(var k5=0; k5<keisuCount; k5++){
				value2 = value2[IdxPatternList[k4][k5]];
			}
			if(value2[0] == 2 && value2[1] == 1 && value2[2] == 2){
				var a;
				a++;
			}
			if(IsOKKeisu(value2, g_ReactantList, g_ProductList) == true){
				successKeisu = value2;
				successFlg = true;
				break loop1;
			}
			
		}
		
	}
	
	if(successFlg == false){
		alert("適当な係数が見つかりませんでした");
		return null;
	}
	
	return successKeisu;

}

function MakeKeisuCombiListByBlock(startValList, deepLength, volume){

	var valueList = [];
	
	for(var i=0; i<deepLength; i++){
		var  array1 = [];
		for(var j=0; j<volume; j++){
			array1.push(startValList[i] + j);
		}
		valueList.push(array1);
	}
	
	var keisuCombiList;
	keisuCombiList = CreateCombinationList_B(deepLength, valueList);
	
	return keisuCombiList;
}
function CreateCombinationList_B(loopCount, valueList){
	var resultList = [];
	resultList = CreateCombinationList2_B(resultList, loopCount, valueList);
	return resultList;
}

function CreateCombinationList2_B(resultList, loopCount, valueList){
	var resultList2;
	var resultList3;
	var resultList4 = [];
	
	loopCount = loopCount-1;
	if(loopCount >= 0){
		for(var i=0; i<valueList[loopCount].length; i++){
			resultList2 = resultList.slice(0);
			resultList2.push(valueList[loopCount][i]);
			
			resultList3 = CreateCombinationList2_B(resultList2, loopCount, valueList);
			
			resultList4.push(resultList3);
		}

		
		return resultList4;
	}else{
		return resultList;
	}
}

function CreateArrayIdxListToMaxIdx(deepLength, arrayValVolList, maxIdx){
	var resultList = [];
	var result1 = [];
	var result2;
	var keta;
	
	for(var j=0; j<deepLength; j++){
		result1.push(0);
	}
	
	resultList.push(result1);
	for(var i=0; i<maxIdx; i++){
		result2 = result1.slice(0);
		keta = deepLength-1;
		AddOne(result2, keta);
		
		while(IsKuriagari(result2, keta, arrayValVolList)){
			result2[keta] = 0;
			keta--;
			AddOne(result2, keta);
		}
		resultList.push(result2);
		result1 = result2;
		
	}
	
	return resultList;
}

function AddOne(list1, keta){
	list1[keta] += 1;
}

function IsKuriagari(list1, keta, arrayValVolList){
	if(list1[keta] > arrayValVolList[keta]){
		return true;
	}
	return false;
}

function FetchOnePattern(patternList, index, deepLength, patternVolumeList){
	var keta1;
	var num1;
	var value1;
	var indexArray = [];
	
	num1 = index.toString(3);
	for(var i=0; i<deepLength; i++){
		if((deepLength - num1.length) > i){
			indexArray.push(0);
		}else{
			break;
		}
	}
	for(var j=0; j<num1.length; j++){
		indexArray.push(parseInt(num1.charAt(j)))
	}
	
	value1 = blockCombiList;
	for(var k=0; k<indexArray.length; k++){
		value1 = value1[indexArray[k]];
	}
	
	return value1;

}


function FetchOneBlock(blockCombiList, index, deepLength){
	var keta1;
	var num1;
	var value1;
	var indexArray = [];
	
	num1 = index.toString(3);
	for(var i=0; i<deepLength; i++){
		if((deepLength - num1.length) > i){
			indexArray.push(0);
		}else{
			break;
		}
	}
	for(var j=0; j<num1.length; j++){
		indexArray.push(parseInt(num1.charAt(j)))
	}
	
	value1 = blockCombiList;
	for(var k=0; k<indexArray.length; k++){
		value1 = value1[indexArray[k]];
	}
	
	return value1;
}

function IsOKKeisu(keisuList, g_ReactantList, g_ProductList){
	
	/*
	if(keisuList[0] == 2 && keisuList[1] == 1 && keisuList[2] == 2){
		var c=0;
		c++;
	}
	*/
	
	var sum = 0;
	for(var k=0; k<keisuList.length; k++){
		for(var k2=0; k2<allGensoList.length; k2++){
		
			for(var i=0; i<g_ReactantList.length; i++){
				sum += allKeisu[k2][i] * keisuList[i];
				
			}

			for(var j=0; j<g_ProductList.length; j++){
				sum += allKeisu[k2][g_ReactantList.length+j] * keisuList[g_ReactantList.length+j]
			}
			
			//計算結果が0の範囲内のとき、
			if(sum >= -0.01 && sum <= 0.01){
			}else{//それ以外
				return false;
			}
			
		}
	}
	
	return true;
}


function CreateCombinationList(loopCount, valueList){
	var resultList = [];
	resultList = CreateCombinationList2(resultList, loopCount, valueList);
	return resultList;
}

function CreateCombinationList2(resultList, loopCount, valueList){
	var resultList2;
	var resultList3;
	var resultList4 = [];
	
	loopCount = loopCount-1;
	if(loopCount >= 0){
		for(var i=0; i<valueList.length; i++){
			resultList2 = resultList.slice(0);
			resultList2.push(valueList[i]);
			
			resultList3 = CreateCombinationList2(resultList2, loopCount, valueList);
			
			resultList4.push(resultList3);
		}

		
		return resultList4;
	}else{
		return resultList;
	}
}

