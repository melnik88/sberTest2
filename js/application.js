/**
 * Created with JetBrains PhpStorm.
 * User: Egor
 * Date: 09.04.14
 * Time: 23:29
 * To change this template use File | Settings | File Templates.
 */
window.App = (function(){
	// контейнеры
	$table = $('.b-table');
	$tableCheckboxes = null;
	$mainCheckbox = $('.b-add-man input[type=checkbox]');
	// загрузка данных
	$.ajax({
    url: '../json/customers.json',             
    dataType : "json",                     
    success: function (data, textStatus) {
    	var people = data; 
        $.get("../json/customers-groups.json", function (data) {
        	var groups = data;
        	parseCustomers(people, groups);
        	checkboxWork();

        });

		var parseCustomers = function(data, groupdata){
			$.each(data, function(i, val) {    
		    var groups ='';
		    if (val.groups != null){
		    	groups = '<ul>';
		    	var groupsArrayLength = val.groups.length;
		    	for (var i=0; i < groupsArrayLength; i++){
		    		for( var j=0; j<groupdata.length; j++){
		    			if (val.groups[i]==groupdata[j].id){
		    				groups+='<li>'+groupdata[j].title+'</li>'}
		    		}
		    	}
		    	groups+='</ul>'
		    }	
		    
		    var string = '<tr class="b-table__item">'+
		    				'<td width=50 align=center><input type="checkbox"></td>'+
		            		'<td>'+	((val.firstname != null) ? val.firstname : '') +' '+
		            			((val.middlename != null) ? val.middlename : '')+' '+
		            			((val.lastname != null) ? val.lastname : '')+'</td>'+
		            		'<td>'+((val.email != null) ? val.email : '')+'</td>'+
		            		'<td>'+((val.groups != null) ? val.groups: '')+'</td>'+
		            		'<td>'+groups+'</td>'+
							'</tr>'
		    $table.find('tr:last-child').after(string)    
		        });

		
		}//end of parseCustomers

	var checkboxWork = function(){
		
		$tableCheckboxes = $table.find('input[type="checkbox"]') 
		$mainCheckbox.click(function(){
			if($(this).prop('checked')=='false' )
				$(this).attr('checked','checked') 
				$tableCheckboxes.prop('checked', true); 
		})
		$tableCheckboxes.click(function(){
			console.log($tableCheckboxes.filter(':checked').length!=$tableCheckboxes.length)
			$mainCheckbox.prop('checked', false); 
		})
	}//end of checkboxWork
	


	// $tableCheckboxes = $('.b-table input');
	// console.log ($tableCheckboxes)
	// //работа с чекбоксами
	// $mainCheckbox.click(function(){
	// 	console.log($(this).attr('checked')) 
	// 	if ($(this).attr('checked')== 'undefined') {
	// 		$tableCheckboxes.attr('checked')=='checked'
	// }
	// })


    }//end of success               
});

})()
