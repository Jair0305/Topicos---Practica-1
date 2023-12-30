/*

    Created: 2023-03-03
    Created by: Chavez Islas Jair
    Description: assigment 1

*/

/* eslint-disable */
const colors = require('colors');
var prompt = require('prompt-sync')({ sigint: true});//sigint: true nos sirve para poder interrumpir el programa en cualquier punto de este


let eventArray = []; //Definí el array en el que se van a guardar los registros de los eventos
let studentArray = []; //Definí el array donde se van a guardar los registros de los estudiantes

class student //Clase de estudiante
{
  static idCounter = 1;
  constructor(id = null,nombre, email, career) //Constructor con los datos que se nos pidio en el documento
  {
    this.id = id || student.idCounter++//El id se va  aautogenerar, comenzando desde 1 con cada registro que se haga
    this.nombre = nombre
    this.email = email
    this.career = career;
  }
}

class eventO //Clase de evento
{
  static idCounter = 1;
  constructor(id = null,title, date, hour, place, speakerName, listStudents = []) //El constructor de evento donde decidi añadir un array vacío para guardar los id's de los alumnos que se registren a dicho evento
  {
    this.id = id || eventO.idCounter++//El id de evento se va a autogenerar con cada registro a evento, iniciando desde 1
    this.title = title
    this.date = date
    this.hour = hour
    this.place = place
    this.speakerName = speakerName
    this.listStudents = listStudents=[]
  }
}

mainmenu(); //Solo mando a llamar una funcion, que es el menú principal, a apartir de aqui se ejecuta todo lo demás

function mainmenu()
{
  console.clear();
  let decision;
  do {//Para los menus, considere validar que el usuario ingrese un numero valido del menu, y todas las demas validaciones a lo largo del programa, igual use while y do while
    console.clear();
    console.log("Bienvenido al sistema de operaciones CRUD, sobre qué quieres trabajar?\n\n1. student\n\n2. event\n\n3. student on event\n\n0. Salir\n\n".magenta);//Meti el paquete "colors" ya que me aprecio una buena idea hacerlo mas bonito
    decision = parseInt(prompt(`Escoge una opcion: `.green));//Cabe destacar que el prompt se bugea con textos muy largo, pro eso opte imprimir primero la peticion con un console.log y luego solo pedir el dato con prompt
    if(isNaN(decision))//funcion isNaN (is Not a Number) solo recibe numeros, por lo que me aseguro que no pusieran letras en los menus
    {
      //console.log(`El valor que ingresa no es valido!!!!!`.red);
      mainmenu();//Si ingresa otra cosa que no sea numero, invoca el mismo menu, es como si no hiciera nada el programa...
    }else if (decision === 1) 
    {
      menuStudent();
    }
    if (decision === 2) 
    {
      menuEvento();
    }
    if (decision === 3) 
    {
      menuStuEve();
    }
    if (decision === 0)
    {

    }
  } while (decision < 0 || decision > 3); //con este ciclo, el menu se va a seguir ejecutando hasta el usuario escoja una opcion valida del menu
}

function menuStudent()
{
  let decision;
  console.clear();//En cada menu puse la funcion console.clear, para que borrara la consola y no se amontonen los datos
  console.log(`Esta en el menu de estudiantes, que quiere hacer?`.magenta)
  do {
    console.log("\n1.Create\n2.Read\n3.Update\n4.Delete\n\n5.Regresar\n0.Salir\n".blue);
    decision = prompt(`Escoge una opcion: `.green);
    if(isNaN(decision))
    {
      menuStudent();
    }
    else if (decision == 1) 
    {
      C(student);
    }
    if (decision == 2) 
    {
      R(studentArray);
    }
    if (decision == 3) 
    {
      U(studentArray);
    }
    if (decision == 4) 
    {
      D(studentArray, eventArray);
    }
    if (decision == 5)
    {
      mainmenu();
    }
  } while (decision === 0);
}

function menuEvento()
{
  let decision;
  console.clear();
  console.log(`Esta en el menu de eventos, que desea hacer? `.magenta)
  do {
    console.log("\n1.Create\n2.Read\n3.Update\n4.Delete\n\n5.Regresar\n0.Salir\n".blue);
    decision = prompt(`Escoge una opcion: `.green);
    if(isNaN(decision))
    {
      menuStudent();
    }
    else if (decision == 1) 
    {
      C(eventO);
    }
    if (decision == 2) 
    {
      R(eventArray);
    }
    if (decision == 3) 
    {
      U(eventArray);
    }
    if (decision == 4) 
    {
      D(eventArray);
    }
    if (decision == 5)
    {
      mainmenu();
    }
  } while (decision === 0);
}

function menuStuEve()
{
  let decision;
  console.clear();
  console.log(`Esta en el menu de estudiantes sobre eventos, que desea hacer?`.magenta)
  do {
    console.log("\n1.Create\n2.Read\n3.Delete\n\n5.Regresar\n0.Salir\n".blue);
    decision = prompt(`Escoge una opcion: `.green);
    if(isNaN(decision))
    {
      menuStudent();
    }
    else if (decision == 1) 
    {
      registerC();
    }
    if (decision == 2) 
    {
      registerR();
    }
    if (decision == 3) 
    {
      registerD();
    }
    if (decision == 5)
    {
      mainmenu();
    }
  } while (decision === 0);
}

function C(objeto) 
{ 
  let career;
  if (objeto === student) //Para no hacer multiples funciones, reutilice la misma funcion de CRUD para estudiante y evento, cabe destacar que en los menus de estudiante y de evento, pase como parametro sus respectivos arrays y clases tanto a estudiante como a vento
  {                       //por lo que dentro de cada una de estas funciones solo agregue 2 ifs, por si el parametro que se le paso era la clase student, pidiera los datos de estudiante y que pidiera los datos de evento en caso de que tuviera como parametro la clase de evento
    let alumno = new student();
    console.log(`Introduce el nombre del alumno: `.blue);
    alumno.nombre = prompt(`>>>`.green);
    while (true)//While true, siempre va a entrar cuando el usuario ingrese el correo, por lo que siempre pasara por las 2 validaciones si o si
    {
      console.log(`Introduce el email del alumno: `.blue);
      alumno.email = prompt(`>>>`.green); //se guarda em alumno.email el correo
      alumno.email = alumno.email.toLowerCase();//Las 2 ultimas funciones del programa las use apra valdiar los correos, para validarlos, tuve que convertir el correo a solo minusculas y asi seria mas facil para mi comparar un correo con otro
      if (!validacionEmail(alumno.email)) // aqui use regex, para validar que el formato del correo solo pudiera terminar en "@ugto.mx"
      {
        console.log(`El correo electronico ${alumno.email} no es valido, intentelo de nuevo\n(Recuerde que debe temrinar con @ugto.mx)`.red);//mensaje de error en caso de formato no cumplido
        continue;
      }
      if (!validacionComparacionCorreo(alumno.email))//En esta parte valido que el correo de un estudiante no sea igual al de otro...
      {
        console.log(`El correo electronico ${alumno.email} ya existe, intentelo de nuevo`.red);//mensaje de error en caso de que se ingrese un correo ya registradp
        continue;
      }
      break;
    }
    while(career !== 'LISC' && career !== 'LAT' && career !== 'LIGE' && career !== 'LIM' && career !== 'LIME' && career !== 'LIE')//Use como referencia las siglas de las carreras de dicis, con esta validacion se fuerza al usuario a ingresar una de estas carreras en mayusculas y solo las inciiales
    {
      console.log(`Ingrese la carrera del alumno tomando en cuenta las siguientes existentes(Favor de usar mayusculas):\nLISC LAT LIGE LIM LIME LIE`.blue)
      career = prompt(`>>>`.green);
      if(career !== 'LISC' && career !== 'LAT' && career !== 'LIGE' && career !== 'LIM' && career !== 'LIME' && career !== 'LIE')
      {
        console.log(`Por favor Escoja una carrera válida!!!`.red);//mensaje de error en caso de que ponga una diferente
      }else
      {
        alumno.career = career;//En caso de que pong auna valida, la guarda en alumno.carrera
      }
    }
    
    studentArray.push(alumno);//ya que haya guardado todos los datos de cada atributo del objeto que creamos al principio de este if, los empuja todos juntos al array declarado hasta el principio del programa llamado "studentArray"
    mainmenu();
  }else if(objeto === eventO)//si el parametro que se le paso no es estudent y en su lugar es eventO, entonces entra en esta parte del codigo saltandose todo lo anterior
  {
    let hour;
    let evento = new eventO();
    //console.log(eventArray);
    console.log(`Introduce el titulo del evento: `.blue);
    evento.title = prompt(`>>>`.green);//Guarda el titulo del evento en evento.title
    let combinacion;
    do //en este dowhile se hace la validacion de que no puede haber un evento el mismo dia, la misma fecha y el mismo lugar
    {
      combinacion = false;
      
      do //En esta validacion hice que el usuario deba poner una fecha valida, como 05/02/2023 o 5/02/2023 o incluso 5/2/2023 
      {
        console.log(`Introduce la fecha del evento en formato dd/mm/yyyy: `.blue);
        evento.date = prompt(`>>>`.green);//Guarda la fecha en evento.date

        if(!evento.date.match(/^\d{2}\/\d{2}\/\d{4}$/) || !validarFecha(evento.date))
        {
          console.log(`Escribe una fecha correcta con el formato solicitado!!!`.red)//Mensaje de error en caso de que no ponga una fecha con el formato indicado
        }
        
      } while (!evento.date.match(/^\d{2}\/\d{2}\/\d{4}$/) || !validarFecha(evento.date));

      do//solo puse horas enteras, si la universidad abre a las 8 y cierra a las 6, tomando enc uenta que no puede haber un evento a las 6 ya que, a esa hora se cierra, hice la validacion de que la hora sea entre 8 y 5, y usando solo numeros enteros
      {
        console.log(`Tomando en cuenta que la universidad abre a las 8 y cierra a las 18`.blue)
        console.log(`Introduce la hora del evento en formato 24 horas: `.blue);
        hour = prompt(`>>>`.green);
        if(hour > 7 && hour <18)
        {
          evento.hour = hour //Guarda en evento.hour
        }else
        {
          console.log(`Hora fuera del rango!!!, por favor escoja otra hora`.red)
        }
      }
      while(hour < 7 || hour >17)

      console.log(`Introduce el lugar del evento: `.blue);
      evento.place = prompt(`>>>`.green);//guarda lo que ponga el usuario en evento.place

      for(let i=0;i<eventArray.length; i++)
      {
        if(eventArray[i].date === evento.date && eventArray[i].place === evento.place && eventArray[i].hour === evento.hour)
        {
          console.log(`Ya hay un evento en ese lugar, en esa fecha y en ese lugar\nintente con otra combinacion\n\n`. red);//mensaje de error en caso de que el evento se repita a otro en el mismo lugar, fecha y todo
          combinacion = true//Esto es lo que define si el ciclo se cierra, y esque debe ser false para que continue, en caso de que no, sigue pidiendo estos 3 datos para que ya no sean repetidos
          break;
        }
      }
    
    }while(combinacion)

    console.log(`Introduce el nombre del ponente: `.blue);
    evento.speakerName = prompt(`>>>`.green);//Lo guarda en evento.speakerName

    eventArray.push(evento); //todos los datos registrados los empuja al mismo tiempo al array eventArray
    mainmenu();//No importa si esta registrando un evento o un alumno, siempre va a regresar al menu principal al final
  }
}

function R(objeto)
{
  if(objeto === studentArray)//hice de nuevo la validacion sobre el parametro que recibe, en este caso no les pase las clases sino los arrays
  {
    console.table(studentArray)//En este caso solo muestro una tabla con todos los registros de los estudiantes
    //mainmenu();
    let decision;
    while(decision != 1 && decision != 2)//menu para regresar al menu anterior(menu de estudiante) o al menu principal
    {
      console.log(`Quieres regresar al menu anterior o al menu principal...(?) \n Anterior: (1)\n Principal: (2)`.blue)
      decision = prompt(`Elige una opcion: `.green)
      
      if(decision === "2")
      {
        mainmenu();
      }else if(decision === "1")
      {
        menuStudent();
      }
    }
    
  }else if(objeto === eventArray)
  {
    console.table(eventArray)//En este caso solo muestro una tabla con todos los registros de los eventos
    
    let decision;
    while(decision != 1 && decision != 2)//menu para regresar al menu anterior(menu de evento) o al menu principal
    {
      console.log(`Quieres regresar al menu anterior o al menu principal...(?) \n Anterior: (1)\n Principal: (2)`.blue)
      decision = prompt(`Elige una opcion`.green)
      
      if(decision === "2")
      {
        mainmenu();
      }else if(decision === "1")
      {
        menuEvento();
      }
    }
  }
}

function U(objeto) 
{
  if(objeto === studentArray) 
  {
    console.table(studentArray)//imprimo la tabla de los estudiantes para que el usuario pueda ingresar que id quiere registrar
    console.log(`Elige el id del estudiante al cual quieres modificar sus datos`.blue);
    let peticion = prompt(`>>>`.green); 
    // console.log(`Buscando al estudiante con ID ${peticion}...`);
    let findStudent = objeto.findIndex(student => student.id === parseInt(peticion));//en base a lo que haya puesto el usuario que se guarda en la variable peticion, encuentro su index, para poder manipular los datos a aprtir de su indice
    // console.log(`El índice del estudiante con ID ${peticion} es ${findStudent}`);

    if (findStudent !== -1) //Como vimos en clase, si el index regresa -1, es que no se encontro en el array, en caso de que no, devolvera el indice de la persona, asi que si el indice es diferente a -1, prosigue pidiendo los datos a modificar
    {
      let estudiante = objeto[findStudent];//se declara estudiante con los valores del objeto que queremos
      console.log(`Introduce el nombre del alumno: `.blue);
      estudiante.nombre = prompt(`>>>`.green); //Reemplazo el valor de esstudiante.nombre, que es el nuevo nombre nuevo que vaya a poner en el registro del id que escogio
      let nuevoEmail = "";
      while (true) {
        console.log(`Introduce el email del alumno: `.blue);
        nuevoEmail = prompt(`>>>`.green); //Guardo el email e una variable nueva, ya que tengo que hacerle validaciones antes de reemplazarla
        nuevoEmail = nuevoEmail.toLowerCase();
        if (!validacionEmail(nuevoEmail)) 
        {
          console.log(`El correo electrónico ${nuevoEmail} no es válido, inténtelo de nuevo`.red);
          continue;
        }
        cicloExterno://Etiqueta que usare en un break mas adelante
        if (objeto.some(student => student.email === nuevoEmail)) //aqui la comparacion es distinto, no necesitamos acceder a un ciclo for,ya que ahora lo compara con otros emails del array
        {                                                         //Tuve conflictos ya que al querer editar un registro, no me dejaba poner el mismo correo, por lo que hice un peque;o menu donde doy a escoger si conservarlo o cambiarlo
          
          if(nuevoEmail === studentArray[findStudent].email)
          {
            let elec
            do
            {
              console.log(`El correo que pusiste es igual al que ya tenias, deseas dejarlo asi o cambiarlo?\n\n0. Dejar correo\n1.Cambiarlo`.red);//peque;o menu para saber si conservar o cambiar correo
              elec = parseInt(prompt(`>>>`.green));
              if(elec === 0)
              {
                estudiante.email = studentArray[findStudent].email
                break cicloExterno;//me salto este ciclo y el ciclo padre, ya que al querer conservar el correo, solo lo pongo igal y me salto la verificacion
              }else if(elec === 1)
              {
                continue;
              }
            }while(!isNaN(elec) && elec < 0 && elec > 1)
          }
          console.log(`El correo electrónico ${nuevoEmail} ya existe, inténtelo de nuevo`.red);
          continue;
        }else if(validacionEmail(nuevoEmail) && objeto.some(student => student.email !== nuevoEmail))
        {
          estudiante.email = nuevoEmail;//Si se verifica el email y no se encuentra otro correo igual exceptuando de alguna manera el correo que ya tenia, reemplaza el valor del atributo del objeto
        }
        
        break;
      }
      
      let career
      while(career !== 'LISC' && career !== 'LAT' && career !== 'LIGE' && career !== 'LIM' && career !== 'LIME' && career !== 'LIE');//Validacion para que escoja las carreras que hay disponibles
      {
        console.log(`Ingrese la carrera del alumno tomando en cuenta las siguientes existentes(Favor de usar mayusculas):\nLISC LAT LIGE LIM LIME LIE`.blue);
        career = prompt(`>>>`.green);
        if(career !== 'LISC' && career !== 'LAT' && career !== 'LIGE' && career !== 'LIM' && career !== 'LIME' && career !== 'LIE')
        {
          console.log(`Por favor Escoja una carrera válida!!!`.red);
        }else
        {
          estudiante.career = career;//Ya que se haya validado, se reemplaza el atributo del objeto
        }
      }
    } else 
    {
      console.log(`No se encontró ningún estudiante con el ID ${peticion}`.red);//Validacion por si no encuentra el id del estudiante
    }
    mainmenu();//al final, retorna al menu principal
  }else if(objeto === eventArray) 
  {
    console.table(eventArray)

    console.log(`Elige el id del evento el cual quieres modificar sus datos`.blue);
    let peticion = prompt(`>>>`.green);
    // console.log(`Buscando el evento con ID ${peticion}...`);
    let findEvent = objeto.findIndex(evento => evento.id === parseInt(peticion));//funcion para encontrar el indice del evento al cual quiere acceder el usuario
    // console.log(`El índice del evento con ID ${peticion} es ${findEvent}`);
    if (findEvent !== -1) //Si encontramos el evento, entonces...
    {
      let evento = objeto[findEvent];
      console.log(`Introduce el titulo del evento: `.blue);
      evento.title = prompt(`>>>`.green);//Sustituimos el valor title de ese objeto

      do 
      {
        combinacion = false;
        let date, place, hour;//Declaro estas variables para guardar aqui las cosas que ingrese el usuario, para poder manipularlas antes de reemplazarlas en el array
        do 
        {
          console.log(`Introduce la fecha del evento en formato dd/mm/yyyy: `.blue);
          date = prompt(`>>>`.green);
  
          if(!evento.date.match(/^\d{2}\/\d{2}\/\d{4}$/) || !validarFecha(evento.date))
          {
            console.log(`Escribe una fecha correcta con el formato solicitado!!!`.red)
          }
          
        } while (!evento.date.match(/^\d{2}\/\d{2}\/\d{4}$/) || !validarFecha(evento.date));//validacion formato de fecha
  
        do
        {
          console.log(`Tomando en cuenta que la universidad abre a las 8 y cierra a las 18`.blue)
          console.log(`Introduce la hora del evento en formato 24 horas: `.blue);
          hour = prompt(`>>>`.green);
          if(hour < 7 && hour >17)
          {
            console.log(`Hora fuera del rango!!!, por favor escoja otra hora`.red)
          }
        }
        while(hour < 7 || hour >18)//validacion de hora dentro del rango
  
        console.log(`Introduce el lugar del evento: `.blue);
        place = prompt(`>>>`.green);
  
        for(let i=0;i<eventArray.length; i++)
        {
          if(eventArray[i].date === date && eventArray[i].place === place && eventArray[i].hour === hour && i !== findEvent) //Si la combinacion de los 3 valores es igual omitiendo el registro del id actual, entonces se vuelve a preguntar
          {
            console.log(`Ya hay un evento en ese lugar, en esa fecha y en ese lugar\nintente con otra combinacion\n\n`. red);
            combinacion = true;
            break;
          }else
          {
            evento.hour = hour
            evento.place = place
            evento.date = date//Aqui ya que se han hecho las validaciones requeridas, se reemplazan los datos del array
          }
        }
      
      }while(combinacion)//validacion de que no coindian estos 3 valores en un evento ya creado

      console.log(`Introduce el nombre del ponente: `.blue);
      evento.speakerName = prompt(``.green); //Se reemplaza speakerName
    } else 
    {
      console.log(`No se encontró ningún evento con el ID ${peticion}, intente ingresar otro id\n\n Presione enter para ir al menu anterior`.red);
      prompt(``);
      menuEvento();
    }
    mainmenu();
  }
}

function D(objeto, objeto2)//Esta es la unica donde tenemos 2 parametros, el student array y el eventarray 
{                          //Esto es porque cuando eliminemos a un estudiante del registro, tambien eliminaremos su id en los eventos en los que este inscrito
  if(objeto === studentArray)
  {
    console.table(studentArray);
    console.log(`Elige el id del estudiante al que quieres eliminar: `.blue);
    let peticion = prompt(`>>>`.green); //Se muestra una tabla de los estudiantes para saber cual eliminar y se guarda en la variable peticion
    // console.log(`Buscando al estudiante con ID ${peticion}...`);
    let findStudent = objeto.findIndex(student => student.id === parseInt(peticion));//Localizamos el indice del alumno que el usuario quiere eliminar
    // console.log(`El índice del estudiante con ID ${peticion} es ${findStudent}`);

    if (findStudent != -1) //Si lo encuentra, entonces...
    {
      let studentDeleted = objeto.splice(findStudent, 1);//Elimina sus datos del registro de alumnos
    
      // Eliminar el ID del estudiante en todas las listas de eventos
      for (let i = 0; i < objeto2.length; i++) {
        let listStudents = objeto2[i].listStudents;
        let indice = listStudents.indexOf(parseInt(peticion));
        if (indice !== -1) {
          listStudents.splice(indice, 1);
        }
      }
    
      console.log(`Estudiante con el id ${studentDeleted} ha sido borrado\nJunto con todos sus registros en los distintos eventos\n\nPresione enter para continuar`.green);//Mensaje de confirmacion
      
      prompt(``);
    } else {
      console.log(`El id ${peticion} no esta en el registro`.red);//En caso de que no se encuentre el id del estudiante
    }
    mainmenu();//Al final nos regresa al menu principal
  }else if(objeto === eventArray)
  {
    console.table(eventArray)
    console.log(`Elige el id del evento al que quieres eliminar: `.blue)
    let peticion = prompt(`>>>`.green); 
    // console.log(`Buscando al evento con ID ${peticion}...`);
    let findEvent = objeto.findIndex(event => event.id === parseInt(peticion));
    // console.log(`El índice del evento con ID ${peticion} es ${findEvent}`);

    if(findEvent != -1)
    {
      let eventDeleted = eventArray.splice(findEvent, 1)
      console.log(`Estudiante con el id ${eventDeleted[0]} ha sido borrado`.green)
      console.log
      setTimeout(() =>{
      },5000)

    }else
    {
      console.log(`El id ${peticion} no esta en nuestro registro`.red)
    }
    mainmenu();
  }
}

function registerC() //funcion para registrar alumnos dentro de los eventos
{
  console.clear();
  console.log(`Aqui esta la lista de alumnos y la lista de eventos registrados en el sistema: `.blue);
  console.table(studentArray);
  console.table(eventArray);//imprimo los estudiantes y los eventos para que el usuario sepa que estudiantes va a registrar en cual evento

  let evenReg;
  let findEvent;//Se declaran estas variabels necesarias para el ciclo, delo contrario no jala

  do 
  {
    console.log(`Elige el id del evento al que quieras agregar alumnos: `.blue);
    evenReg = prompt(`>>>`.green);
    findEvent = eventArray.findIndex((evento) => evento.id === parseInt(evenReg));//Capturamos el id del evento y sacamos su indice dento de su array
    if(eventArray.length === 0)//En caso de que no haya eventos
    {
      console.log(`No hay eventos registrados en nuestro sistema\n presione enter para ir al menu de eventos`);
      prompt(``);
      menuEvento();//Regresa al menu de ventos para registrar uno
      break;
    }
    else if (findEvent === -1) 
    {
      console.log(`El evento no se ha registrado!!!`.red);//Mensaje de error por si no encuentra el evento solicitado
    } else 
    {
      let cantidadAlumnos = 0;
      do 
      {
        console.log(`Seleccione la cantidad de alumnos que va a registrar en dicho evento`.blue);//Para no hacer registros de alumnos uno por uno, hay la opcion de escribir cuantos queires ingresar
        cantidadAlumnos = parseInt(prompt(`>>>`.green));//Toma el valor y lo guarda en cantidadAlumnos

        if (cantidadAlumnos > studentArray.length) 
        {
          console.log(`No hay esa cantidad de estudiantes en nuestro sistema, intente con un numero mas chico`.red);//Mensaje de error por si queires ingresar mas alumnos de los que existen en el sistema
          if(studentArray.length === 0)
          {
            console.log(`No hay alumnos registrados en el sistema, presione enter apra ir el menu de estudiantes`)//Si no hay alumnos registrados, te lleva al menu de estudiantes para registrarlos
            prompt(``);
            menuStudent();
            break;
          }
        } else //En caso de que si encuentre al alumno
        {
          for (let i = 0; i < cantidadAlumnos; i++) //Para registrar a todos los alumnos dependiendo de la cantidad que haya puesto el usuario
          {
            console.log(`Elige el id del alumno que desea registrar: `.blue);
            let studentRegistered = parseInt(prompt(``.green));
            let findStudent = studentArray.findIndex((student) => student.id === studentRegistered);//pide el id de cada estudiante y guarda su indice en findStudent
            if (findStudent !== -1) //Si encuentra al estudiante, entonces...
            {
              if (!eventArray[findEvent].listStudents.includes(studentRegistered)) //Si el alumno no se ha registrado en el evento previamente...
              {
                eventArray[findEvent].listStudents.push(studentRegistered);//Hace un push del id del estudiante al array que tenemos como atributo del objeto de eventos
                console.log(`El alumno con el id ${studentRegistered}, se ha registrado en el evento con el id ${evenReg} con exito!!`.green);//Mensaje de aprobacion
                prompt(``);
              }else 
              {
                console.log(`Este alumno ya está registrado en este evento.`.red);//Caso en que el alumno ya este registrado en el evento
              }
            }else 
            {
              console.log(`Este alumno no está en nuestros registros.`.red);//mensaje de error si no existe el alumno en el sistema
            }
          }
        }
      } while (cantidadAlumnos > studentArray.length);//Validacion de que el usuario teclee menos o la misma cantidad de alumnos que hay en el sistema
    }
  } while (findEvent === -1);
  
  //console.table(eventArray);
  //prompt(``);
  mainmenu();//Al final se regresa al menu principal
}

function registerR()
{
  console.table(eventArray)

  console.log(`Elige el id del evento el cual quieras ver alumnos registrados: `.blue)
  let eleccion = parseInt(prompt(`>>>`.green));
  // console.log(`Buscando al evento con ID ${eleccion}...`);
  let findEvent = eventArray.findIndex(evento => evento.id === parseInt(eleccion));//pide el id del evento y guarda su indice
  // console.log(`El índice del evento con ID ${eleccion} es ${findEvent}`);
  
  if(findEvent != -1)
  {
    console.log(`Datos del evento: `.blue);
    console.table(eventArray[findEvent]);//Muestra los datos en una tabla, pero solamente del evento que haya escogido el usuario, no todos

    console.log(`Datos de los alumnos en el evento: `.blue);
    const students = eventArray[findEvent].listStudents.map(studentId => {//hace un mapeo y rescata los datos de los estudiantes de los id's que estan en el evento requerido
      const studentIndex = studentArray.findIndex(student => student.id === studentId);
      return studentArray[studentIndex]
    })
    console.table(students);//Imprime los datos de los estudiantes
    let yo = prompt();
    mainmenu();//Al final regresa al menu principal
  }else
  {
    console.log(`El evento con el id ${eleccion} no existe`.red)//Mensaje de error en caso de que no existe el evento
    registerR();//Devuelve a la misma funcion
  }
  //mainmenu();
}

function registerD() 
{
  console.table(eventArray)
  console.log(`Elige el id del evento el cual quieras eliminar alumnos`.blue);
  let eleccion = parseInt(prompt(`>>>`.green));
  // console.log(`Buscando al evento con ID ${eleccion}...`);
  let findEvent = eventArray.findIndex(evento => evento.id === parseInt(eleccion));//encuentra el indice de el id que el usuario quiere eliminar
  // console.log(`El índice del evento con ID ${eleccion} es ${findEvent}`);
  
  if (findEvent != -1) 
  {
    console.log(`Datos del evento: `.blue);
    console.table(eventArray[findEvent]);
    console.log(`Datos de los alumnos en el evento: `.blue);
    const students = eventArray[findEvent].listStudents.map(studentId => {
    const studentIndex = studentArray.findIndex(student => student.id === studentId);
    return studentArray[studentIndex]
    })
    console.table(students);//Imprime los alumnos registrados en dicho evento
    console.log(`Elige la cantidad de alumnos que desea eliminar: `.blue);
    let deleteStudents = parseInt(prompt(`>>>`.green));
    if (deleteStudents <= eventArray[findEvent].listStudents.length) 
    {
      for (let i = 0; i < deleteStudents; i++) //elimina una cantidad de alumnos escogido por el usuario, por lo que recorre todo el array
      {
        console.log(`Elige el id del estudiante al que quieres eliminar: `.blue);
        let peticion = prompt(`>>>`);
        // console.log(`Buscando al estudiante con ID ${peticion}...`);
        let findStudent = eventArray[findEvent].listStudents.findIndex(studentId => studentId === parseInt(peticion));//pide el id del estudiante y encuentra su index
        // console.log(`El índice del estudiante con ID ${peticion} es ${findStudent}`);
        if (findStudent != -1) 
        {
          let studentDeleted = eventArray[findEvent].listStudents.splice(findStudent, 1)//Elimina su id del array del objeto evento
          /*
          [{id:1,name:yo,email:yo@yo.yo,career:lisc}] 
          */
          console.log(`Estudiante con el id ${studentDeleted[0]} ha sido borrado`.green)
        } else 
        {
          console.log(`El id ${peticion} no ha sido registrado en este evento`.red)
        }
      }
    } else 
    {
      console.log(`La cantidad de alumnos registrados en este evento es menor a los que desea eliminar, inténtelo de nuevo`.red)
    }
    let yo = prompt();
    mainmenu();
  } else 
  {
  console.log(`El evento con el id ${eleccion} no existe`.red)
  registerR();
  }
}

function validacionEmail(email)
{
  const regex = /^[a-zA-Z0-9._-]+@+(ugto.mx)$/;//regex para validar el formato de correo
  return regex.test(email);
}

function validacionComparacionCorreo(email)
{
  for(let i =0; i<studentArray.length; i++)
  {
    if(studentArray[i].email === email)//fuincion que compara el correo con todos los demas de los registros
    {
      return false
    }
  }
  return true;
}

function validarFecha(fecha) 
{
  var partes = fecha.split("/ ");//Separa los valores que esten juntos poruna barra
  var dia = parseInt(partes[0]);//se uarda la parte de dia, mes y anio, en sus variables respectivamente
  var mes = parseInt(partes[1]);
  var anio = parseInt(partes[2]);

  // Verificar si la fecha es válida
  var fechaValida = true;
  if (isNaN(dia) || isNaN(mes) || isNaN(anio) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || (mes == 2 && (dia < 1 || dia > 29 || (dia == 29 && (anio % 4 != 0 || (anio % 100 == 0 && anio % 400 != 0)))))) {
    fechaValida = false;//validacion de fechas, incluyendo anios bisiestos
  }

  return fechaValida;
}