import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  log_number_a =[];// guardamos los numeros a operar
  log_number_b =[];// 
  log_operation = [];// guardamos la operacion a realizar
  operation:any=null;
  result:any=null;
  number:any=null;

  number_a:any=null;
  number_b:any=null;
  a:boolean=false;
  b:boolean=false;

  left_sign:boolean=false;
change_operation(txt:any){
	if(this.log_number_a.length >0 && this.log_number_b.length == 0){
		//si hay valores en a, y no hay en b
		this.a = true
	}else if(this.log_number_a.length >0 && this.log_number_b.length > 0){
		// si hay valores en a[] y b[]
		this.get_result();
	}
	if(txt == "+"){
		// this.log_operation.push(txt)
		console.log("se agrego operacion suma");
		this.operation="+";
	}else if(txt == "-"){
		console.log("se agrego operacion resta");
		// this.log_operation.push(txt)
		this.operation = "-"
	}else if(txt == "*"){
		console.log("se agrego operacion producto");
		// this.log_operation.push(txt)
		this.operation = "*"
	}else if(txt == "/"){
		console.log("se agrego operacion division");
		// this.log_operation.push(txt)
		this.operation = "/"
	}else if(txt == "%"){
		console.log("se agrego operacion MODULO");
		// this.log_operation.push(txt)
		this.operation = "%"
	}else if(txt == "sqrt"){
		console.log("se agrego operacion raiz cuadrada");
		// this.log_operation.push(txt)
		this.operation = "sqrt"
	}else if(txt == "1/x"){
		console.log("se agrego operacion 1-x");
		// this.log_operation.push(txt)
		this.operation = "1/x"
	}else if(txt == "^2"){
		console.log("se agrego operacion x^2");
		this.operation = "^2"
	}
	//end_if	

	this.temp_result(txt)

}

 addNumber(txt){
	// +  -   *   / 
	if(typeof(txt) == "string"){//si es un signo
		this.change_operation(txt)

	}else{//es un numero
		this.number = true;
		if(this.a == false){
			//si es el primer numero que se pasa
			this.log_number_a.push(txt);
			this.number_a = new Number(this.log_number_a.join('')).valueOf()
		}else if(this.a && this.b == false){
			//si no, ya existe a, entonces se pasa b
			this.log_number_b.push(txt);
			this.number_b = new Number(this.log_number_b.join('')).valueOf()
		}else{
		}

		// this.number= txt;
		// this.log_number.push(txt)
	}
	this.temp_result(txt)
}

	temp_result(txt:any){
		if (this.result == null){ // si es la primera operacion
			if(this.number == null){ // si no se ingreso un numero
				if(this.operation !=null){ // se sigue mostrando 0 como resultado
					this.left_sign = true;
					console.log('left_sign = true')
				}else{
					// this.result = 0
					// this.number_a = 0;
				}
			}else{// se ingreso un numero
				// this.number = true;
			}
		}else{ // no es la primera operacion
			// this.get_result()
		}
	}
	get_result(old_operation?:any){
		// (old_operation) ? this.operation = old_operation : this.operation;
		if(this.number_a !=null && this.number_b !=null && this.operation !=null){
			//si existe a y b, y hay operacion
			if(this.operation == "sqrt"){
				this.result = this.number_a * Math.sqrt(this.number_b);
			}else{
				this.result= eval(`${this.number_a} ${this.operation} ${this.number_b}`)
			}
			//entonces a= resultado y b vuelve a ser null
			this.number_a = this.result;
			//se parte el resultado en los numeros que lo componen con la funcion split
			let temp_a =[]
			new String(this.number_a).valueOf().split('').map((val)=>{
				temp_a.push(new Number(val).valueOf())
				console.log(`${val} se agrego a temp_a`)
			})
			this.log_number_a = temp_a;
			this.number_b = null;
			this.log_number_b =[];
			// this.a = false;
		}else if(this.number_a !=null && this.number_b ==null && this.operation !=null){
			//si existe a y tiene operador antecediendolo
			if(this.left_sign){
				// debugger;
				console.log('se antecede un signo')
				//si se ingreso el signo primero que el numero
				if(this.operation == "*" || this.operation == "/"){
						// si es producto o division se devuelve 0
						console.log('es * o / ')
					this.result= 0;
					//entonces a, pasa a ser 0
					this.number_a = 0;
				} else if(this.operation == "sqrt"){
					this.result = Math.sqrt(this.number_a);
				}else if(this.operation == "1/x"){
					this.result = Math.pow(this.number_a,-1);
					this.number_a = null;
				}else{
					//si es suma o resta se devuelve la evaluacion de ello
					this.result= eval(` ${this.operation}${this.number_a}`)
					console.log('se evaluo con signo - o +')
					//entonces a, pasa a ser resultado
					this.number_a = this.result;
				}
			}else{
				//si no tiene operador antecediendolo
				if(this.operation == "sqrt"){
					this.result = Math.sqrt(this.number_a);
					this.number_a = this.result;
				}
				else if(this.operation == "1/x"){
					this.result = Math.pow(this.number_a,-1);
					this.number_a = this.result;
				}else if(this.operation == "^2"){
					this.result = Math.pow(this.number_a,2);
				}
				else{
					this.result = this.number_a;
					this.number_a = null;
					this.a = false;
					this.log_number_a=[];
				}
			}
		}else{
			this.result = this.number_a;
		}
	}
	clear(){
		this.number= null;
		this.number_a= null;
		this.number_b= null;
		this.operation = null;
		this.left_sign = false;
		this.result = null;
		this.log_number_a=[]; this.a = false;
		this.log_number_b=[]; this.b = false;
	}
	cleanDigit(){
		if(this.a && this.log_number_b.length>0){
			//si a, ya esta asignado, entonces es b quien se esta asignando
			if(this.log_number_a.length>0){
				//si hay valores en a
				this.log_number_b.pop()
				this.number_b = new Number(this.log_number_b.join('')).valueOf()
			}
		}else {
			//se borran los valores en a
			this.log_number_a.pop()
			// this.number_a = new Number(this.log_number_a.join('')).valueOf()
			this.number_a = new Number(this.log_number_a.join('')).valueOf()
		}
	}


}
