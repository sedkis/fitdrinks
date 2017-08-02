//
//
//
// vm.resultsGrid = {
//   data: RecipesResource.data,
//   enableFullRowSelection: true,
//   enableRowHeaderSelection: false,
//   multiSelect: false,
//   columnDefs: [
//     { field: 'name' },
//     {
//       field: 'flavour',
//       width: '35%'
//     },
//     {
//       field: 'calories',
//       width: '20%'
//     }
//   ]
// };
// vm.resultsGrid.onRegisterApi = function(gridApi) {
//   $scope.gridApi = gridApi;
//   gridApi.selection.on.rowSelectionChanged($scope, function(row) {
//     loadRecipeDetails(row.entity);
//   });
// };
