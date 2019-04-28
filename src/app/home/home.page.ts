import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  log_number_a =[];// guardamos los numeros a operar
  log_number_b =[];// 
  log_method = [];// guardamos la operacion a realizar
  method:any=null;
  result:any=null;
  number:any=null;

  number_a:any=null;
  number_b:any=null;

  a:boolean=false;
  b:boolean=false;

  left_sign:boolean=false;
change_method(txt:any){
	if(this.log_number_a.length >0 && this.log_number_b.length == 0){
		//si hay valores en a, y no hay en b
		this.a = true
	}else if(this.log_number_a.length >0 && this.log_number_b.length > 0){
		// si hy valores en a[] y b[]
		this.get_result(this.method);
	}
	if(txt == "+"){
		this.log_method.push(txt)
		console.log("se agrego operacion suma");
		this.method="+";
	}else if(txt == "-"){
		console.log("se agrego operacion resta");
		this.log_method.push(txt)
		this.method = "-"
	}else if(txt == "*"){
		console.log("se agrego operacion producto");
		this.log_method.push(txt)
		this.method = "*"
	}else if(txt == "/"){
		console.log("se agrego operacion division");
		this.log_method.push(txt)
		this.method = "/"
	}//end_if	

	this.temp_result(txt)

}

 addNumber(txt){
	// +  -   *   / 
	if(typeof(txt) == "string"){//si es un signo
		this.change_method(txt)

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
				if(this.method !=null){ // se sigue mostrando 0 como resultado
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
	get_result(old_method?:any){
		(old_method) ? this.method = old_method : this.method;
		if(this.number_a !=null && this.number_b !=null && this.method !=null){
			//si existe  y b, y hay operacion
			this.result= eval(`${this.number_a} ${this.method} ${this.number_b}`)
			//entonces a= resultado y b vuelve a ser null
			this.number_a = this.result;
			this.number_b = null;
			this.log_number_b =[]
		}else if(this.number !=null && this.number_b ==null && this.method !=null){
			//si existe a y tiene operador
			if(this.left_sign){
				// debugger;
				console.log('se antecede un signo')
				//si se ingreso el signo primero que el numero
				if(this.method == "*" || this.method == "/"){
						// si es producto o division se devuelve 0
						console.log('es * o / ')
					this.result= 0;
					//entonces a, pasa a ser 0
					this.number_a = 0;
				}else{
					//si es suma o resta se devuelve la evaluacion de ello
					this.result= eval(` ${this.method}${this.number_a}`)
					console.log('se evaluo con signo - o +')
					//entonces a, pasa a ser resultado
					this.number_a = this.result;
				}
			}
		}else{
			this.result = 0.0;
		}
	}
	clear(){
		this.number= null;
		this.number_a= null;
		this.number_b= null;
		this.method = null;
		this.left_sign = false;
		this.result = null;
		this.log_number_a=[]; this.a = false;
		this.log_number_b=[]; this.b = false;
	}


}
