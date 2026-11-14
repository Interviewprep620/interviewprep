export type Question={id:number;category:string;question:string;type:"behavioral"|"technical"|"coding"};
export const questions:Question[]=[
{id:1,category:"Behavioral",type:"behavioral",question:"Tell me about yourself and the kind of work you are looking for."},
{id:2,category:"Behavioral",type:"behavioral",question:"Tell me about a difficult problem you solved at work."},
{id:3,category:"Behavioral",type:"behavioral",question:"Describe a time you disagreed with a teammate. What did you do?"},
{id:4,category:"Behavioral",type:"behavioral",question:"Tell me about a time you made a mistake and what you learned."},
{id:5,category:"SQL",type:"technical",question:"What is the difference between WHERE and HAVING in SQL?"},
{id:6,category:"SQL",type:"technical",question:"Explain INNER JOIN, LEFT JOIN and FULL OUTER JOIN with an example."},
{id:7,category:"Snowflake",type:"technical",question:"What is a Snowflake virtual warehouse and why is it useful?"},
{id:8,category:"Snowflake",type:"technical",question:"Explain Snowflake micro-partitions and how pruning works."},
{id:9,category:"Python",type:"technical",question:"What is the difference between a list, tuple, set and dictionary in Python?"},
{id:10,category:"Python",type:"technical",question:"Explain Python decorators and give a practical use case."},
{id:11,category:"dbt",type:"technical",question:"What is a dbt model, and how is it different from a source?"},
{id:12,category:"Data Engineering",type:"technical",question:"How would you design a reliable incremental data pipeline?"},
{id:13,category:"Coding",type:"coding",question:"Write a function that returns the first non-repeating character in a string."},
{id:14,category:"Coding",type:"coding",question:"Given an array of integers, find the two numbers that add up to a target."},
{id:15,category:"System Design",type:"technical",question:"Design a simple service that stores and serves interview questions."},
{id:16,category:"Behavioral",type:"behavioral",question:"How do you prioritize when several deadlines arrive at the same time?"},
{id:17,category:"Data",type:"technical",question:"How would you troubleshoot a pipeline that suddenly became slow?"},
{id:18,category:"Cloud",type:"technical",question:"What is the difference between object storage and a relational database?"},
{id:19,category:"Behavioral",type:"behavioral",question:"Why are you considering a change in your current role?"},
{id:20,category:"Behavioral",type:"behavioral",question:"What are your strongest skills and what are you currently improving?"}
];
