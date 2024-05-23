#!/usr/bin/env node
import inquirer  from "inquirer";
import chalk from "chalk";

class Student {
    static counter = 10000;
    id :number;
    name :string;
    courses:string[];
    balance :number;
    constructor(name : string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array for course
        this.balance = 100;

    }
    //Method to enroll students in course
    enroll_course(course: string){
        this.courses.push(course);
    }
    //Method to view balance
    view_balance(){
    console.log(`Balance for ${this.name} : $${this.balance}`);
    
    }

    //Method to pay student fee
    pay_fee(amount:number){
    this.balance -= amount;
    console.log(`${amount} Fee has been paid successfully for $${this.name}`);

    }
    //Method to display status
    show_status(){
     console.log(`ID : ${this.id}`);
     console.log(`Name: ${this.name}`);
     console.log(`Courses: ${this.courses}`);
     console.log(`Balance: $${this.balance}`);
    }
}
class Student_Manager {
    students :Student[]
    
    constructor(){
        this.students = [];
        
    }
    //Mehod to add new students
    add_students (name:string){
       let student = new Student (name);
       this.students.push(student)
       console.log(`Student: ${name} has add succesfully. Student ID: ${student.id}`);
       
    }
    //Method to enroll student in course
    enroll_student(student_id : number,course:string){
        let student = this.find_student(student_id);
        if(student){
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} succesfully`);
            
        }

        }
        //Method to view a student balance
        view_student_balance(student_id: number){
         let student = this.find_student(student_id);
         if(student){
            student.view_balance();
         }else{
            console.log(`Student not found.Kindly Enter a Correct Student ID,`);
            
         }
        }
        //Method to pay student Fee
        pay_student_fee(student_id:number,amount:number){
            let student = this.find_student(student_id);
            if(student){
                student.pay_fee(amount);
            }else{
                console.log(`Student not found.Kindly Enter a Correct Student ID.`);
                
            }
            
        }
        //Method to display Student status
        show_student_status(student_id:number){
            let student = this.find_student(student_id);
            if(student){
              student.show_status();
            }
        }
        //Method to find a student by student ID
        find_student(student_id:number){
            return this.students.find(std => std.id === student_id)
        }
    }

    //Main Functions to run a Program
    async function main () {
       console.log(chalk.blue('Welcome To Student Management System'));
       console.log(chalk.yellow('-'.repeat(100)));

       let student_manager = new Student_Manager();

       //While loop to keep program running
       while(true){
        let choice = await inquirer.prompt(
            [
                {
                    name:'choice',
                    type:'list',
                    massege:'Select an option',
                    choices:[
                        "Add Student",
                        "Enroll Student",
                        "View Student Balance",
                        "Pay Fee",
                        "Show Status",
                        "Exit"

                    ]
                }
            ]
        );
        //using Switch Case to Handle the Choice
        switch(choice.choice){
         case "Add Student":
         let name_input = await inquirer.prompt(
            [
                {
                    name:"name",
                    type:"input",
                    massege:"Enter Student Name"
                }
            ]
         );
         student_manager.add_students(name_input.name);
         break;
         case "Enroll Student":
         let course_input = await inquirer.prompt(
            [
                {
                    name:"student_id",
                    type:"number",
                    massege:"Enter a Student ID"
                },
                {
                    name:"course",
                    type:"input",
                    message:"Enter a Course Name",
                }
            ]
         );
         student_manager.enroll_student(course_input.student_id,course_input.course)
         break;
         case "View Student Balance":
            let balance_input = await inquirer.prompt(
                [
                    {
                     name:"student_id",
                     type:"number",
                     message:"Enter a Student ID"
                    }
                ]
            );
            student_manager.view_student_balance(balance_input.student_id);
            break;
            case "Pay Fee":
                let fee_input = await inquirer.prompt([
                    {
                      name : "student_id",
                      type:"number",
                      message:"Enter a Student ID"
                    },
                    {
                        name:"amount",
                        type:"number",
                        meesage:"Enter the Amount to Pay."
                    }
                ]);
                student_manager.pay_student_fee(fee_input.student_id,fee_input.amount)
                break;
                case "Show Status":
                let status_input = await inquirer.prompt(
                    [
                        {
                          name:"student_id",
                          type:"number",
                          massege:"Enter a Student ID"
                        }
                    ]
                );
                student_manager.show_student_status(status_input.student_id);
                break;
                case "Exit":
                console.log(`Excitting...`);
                process.exit();
                
        }
    
       }
       
        
    }
    main();
