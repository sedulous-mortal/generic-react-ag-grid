import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnDefs: [
				{
					headerName: 'Make',
					field: 'make'
				},
				{
					headerName: 'Model',
					field: 'model'
				},
				{
					headerName: 'Price',
					field: 'price'
				}
			],
			rowData: [
				{
					make: 'Toyota',
					model: 'Celica',
					price: 35000
				},
				{
					make: 'Ford',
					model: 'Mondeo',
					price: 32000
				},
				{
					make: 'Porsche',
					model: 'Boxter',
					price: 72000
				}
			],
			defaultColDef: {
				// Only allow editing of newly created rows
				// Returns true if the row we are editing has an index greater than the length of our static data
				editable: params => {
					return params.node.rowIndex > this.state.rowData.length - 1;
				}
			}
		};
	}

	onGridReady = params => {
		this.gridApi = params.api;
	};

	handleButtonClick = () => {
		const newItem = {
			make: '',
			model: '',
			price: ''
		};
		this.gridApi.updateRowData({ add: [newItem] });
	};

	render() {
		return (
			<div
				className="ag-theme-balham"
				style={{
					height: '500px',
					width: '600px'
				}}
			>
				<AgGridReact
					columnDefs={this.state.columnDefs}
					rowData={this.state.rowData}
					modules={AllCommunityModules}
					defaultColDef={this.state.defaultColDef}
					onGridReady={this.onGridReady}
				></AgGridReact>
				<button onClick={this.handleButtonClick}>Add Row</button>
			</div>
		);
	}
}

export default App;
