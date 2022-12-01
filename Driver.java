//Note: code is messy. Will be rewritten before 2023 using .NET Core and Angular.

package timelogger;

import java.sql.*;
import java.util.Scanner;
import java.util.Date;
import java.util.ArrayList;
import java.text.DecimalFormat;

public class Driver
{
   public static final Scanner CONSOLE = new Scanner(System.in);
   
   public static final int TIME_SPENT_IN_CLASSES = 480;
   
   public static Connection conn;
   
   public static Statement stmt;

   public static void main(String [] args)
   {
      System.out.print("Enter your username: ");
      String username = CONSOLE.next();
      System.out.print("Enter your password: ");
      String password = CONSOLE.next();
      try
      {
         conn = DriverManager.getConnection(
            "jdbc:mysql://129.80.87.206:3306/timelogger?allowPublicKeyRetrieval=true&useSSL=false",
            username, password);

            
         stmt = conn.createStatement();
      }
      catch(SQLException ex)
      {
         ex.printStackTrace();
      }
	  
	  int menuChoice;
	  
      do
      {
         System.out.println("\nWhat would you like to do?");
		 System.out.println("-----------------------------");
		 System.out.println("1. Log an entry");
		 System.out.println("2. Edit an entry");
		 System.out.println("3. Delete an entry");
		 System.out.println("4. View recent logs");
		 System.out.println("5. Print weekly report");
		 System.out.println("-----------------------------");
		 System.out.println("6. Create a new task");
		 System.out.println("7. Mark a task as done");
		 System.out.println("8. View uncompleted tasks");
		 System.out.println("9. View logs for a task");
		 System.out.println("-----------------------------");
		 System.out.println("10. Add a new course");
		 System.out.println("11. Remove a course");
		 System.out.println("-----------------------------");
         System.out.println("0. Exit");
         
         menuChoice = CONSOLE.nextInt();
         
         switch(menuChoice)
         {
            case 1:
				logEntry();
                break;
            case 2:
				editEntry();
				break;
			case 3:
				int deleteChoice;
				System.out.println("\nWarning: This should only be used when you logged something on accident...");
				System.out.println("Would you like to proceed?");
				System.out.println("1. Yes");
				System.out.println("2. No");
				deleteChoice = CONSOLE.nextInt();
				if(deleteChoice == 1)
				{
					deleteLog();
				}
                break;
			case 4:
				System.out.println("\nHow many previous logs would you like to view?");
				int logsToView = CONSOLE.nextInt();
				selectLastLogs(logsToView);
			    break;
			case 5:
				System.out.println("\nWhich week would you like to check?");
				int week = CONSOLE.nextInt();
				System.out.println();
				printReport(week);
                break;
			case 6:
				addTask();
				break;
			case 7:
				markTaskDone();
				break;
			case 8:
				getTasks();
				break;
			case 9:
				viewLogsForTask();
				break;
			case 10:
				addCourse();
				break;
			case 11:
				deleteCourse();
				break;
         }
      }while(menuChoice != 0);
   }
   
   public static void viewLogsForTask()
   {
		System.out.println("\nWhich class is the task in?");
		listAllClasses();
		String course = CONSOLE.next();
		String selectTasks = "SELECT * FROM Tasks WHERE Course = '" + course + "'; ";
		System.out.println("\nHere are your tasks for " + course +":");
		try
		{
			ResultSet rset = stmt.executeQuery(selectTasks);
			while(rset.next())
			{
				int id = rset.getInt("ID");
				course = rset.getString("Course");
				String task = rset.getString("Task");
				System.out.println("ID: " + id + " " + course + ", " + task);
			}
		}
		catch(SQLException ex)
		{
			ex.printStackTrace();
		}
		
		String taskName = " ";
		System.out.println("\nEnter the ID of the task you would like to view the logs of: ");
		int ID = CONSOLE.nextInt();
		String getTaskName = "SELECT * FROM Tasks WHERE Course = '" + course + "' AND ID = " + ID + "; ";
		try
		{
			ResultSet rset = stmt.executeQuery(getTaskName);
			while(rset.next())
			{
				taskName = rset.getString("Task");
			}
		}
		catch(SQLException ex)
		{
			ex.printStackTrace();
		}
		System.out.println("\n" + taskName + " Logs: ");
		
		
		int totalTimeOnTask = 0;
		String getTaskLogs = "SELECT * FROM Times WHERE Task = '" + taskName + "';";
		try
		{
			ResultSet rset = stmt.executeQuery(getTaskLogs);
			while(rset.next())
			{
				int id = rset.getInt("ID");
				//String course = rset.getString("Course");
				int week = rset.getInt("Week");
				int minutes = rset.getInt("Minutes");
				totalTimeOnTask = totalTimeOnTask + minutes;
				String date = rset.getString("Date");
				String task = rset.getString("Task");
				String description = rset.getString("Description");
				System.out.println("ID: " + id + ", Course: " + course + ", Week: " + week + ", Minutes: " + minutes + ", Date: " + date + ", Task: " + task + ", Description: " + description);
			}
			System.out.println("Total Time: " + totalTimeOnTask);
		}
		catch(SQLException ex)
		{
			ex.printStackTrace();
		}
   }
   
   public static void listAllClasses()
   {
	   try
	   {
			String strSelectCourses = "SELECT * FROM Courses";
			ResultSet rset = stmt.executeQuery(strSelectCourses);
			while(rset.next())
			 {
				int id = rset.getInt("ID");
				String courseName = rset.getString("Course");
				System.out.println("Course: " + courseName);
			 }
	   }
	   catch(SQLException ex)
       {
         ex.printStackTrace();
       }
   }
   
   public static int getID()
   {
	   try
	   {
	     String strSelectID = "SELECT id FROM Times";
            
            
         ResultSet rset = stmt.executeQuery(strSelectID);
         rset.next();
            
            
         int id = 1;
            
         while(rset.next())
         {
            id++;
         }
		 return id;
	   }
	   catch(SQLException ex)
       {
         ex.printStackTrace();
       }
	   return 0;
   }
   
   public static int logEntry()
   {
	    int newID = getID();
		if(newID == 0)
		{
			return 0;
		}
		else
		{
			System.out.println("\nWhich class would you like to log an entry for?");
			listAllClasses();
			String classToLog = CONSOLE.next();
			
			System.out.println("\nWhat week is it?");
			int week = CONSOLE.nextInt();
			
			System.out.println("\nHow long did you spend on the task(minutes)?");
			int minutes = CONSOLE.nextInt();
			
			java.sql.Date date = new java.sql.Date(System.currentTimeMillis());
			
			getTasksByCourse(classToLog);
			System.out.println("\nWhat task is this for?");
			CONSOLE.nextLine();
			String task = CONSOLE.nextLine();
			
			System.out.println("\nWhat exactly did you do?");
			String description = CONSOLE.nextLine();
			
			String strInsert = "INSERT INTO Times " + 
			"VALUES(" + newID + ", '" + classToLog + "', " + week + ", " + minutes + ", '" + date + "', '" + task + "', '" + description + "');";
			
			try
			{
				int timeLogged = stmt.executeUpdate(strInsert);
			}
			catch(SQLException ex)
			{
				ex.printStackTrace();
			}
			return 1;
		}
   }
   
   public static void deleteLog()
   {
		System.out.println("\nHere are your last ten logs.");
		selectLastLogs(10);
		System.out.println("\nEnter the ID of the log you wish to delete.");
		int IDOfLogToDelete = CONSOLE.nextInt();
		String strDeleteLog = "DELETE FROM Times WHERE ID = " + IDOfLogToDelete;;
		try
	    {
			int result = stmt.executeUpdate(strDeleteLog);
	    }
	    catch(SQLException ex)
        {
			ex.printStackTrace();
        }
   }
   
   public static void editEntry()
   {
	   System.out.println("\nHere are your last ten longs.");
	   selectLastLogs(10);
	   System.out.print("\n\nEnter the ID of the entry you would like to update: ");
	   int idToUpdate = CONSOLE.nextInt();
	   System.out.println("\nWhat would you like to change about the entry?");
	   System.out.println("1. Course");
	   System.out.println("2. Week");
	   System.out.println("3. Time");
	   System.out.println("4. Date");
	   System.out.println("5. Task");
	   System.out.println("6. Description");
	   System.out.println("0. Exit");
	   int menuChoice = CONSOLE.nextInt();
	   try
	   {
		   switch(menuChoice)
		   {
			    case 1:
					System.out.println("\nEnter the new course name: ");
					String newCourse = CONSOLE.next();
				    String strUpdateCourse = "UPDATE Times SET Course = '" + newCourse + "' WHERE id = " + idToUpdate + ";";
				    int entryUpdated = stmt.executeUpdate(strUpdateCourse);
				    break;
			    case 2:
					System.out.println("\nEnter the new week: ");
					int newWeek= CONSOLE.nextInt();
				    String strUpdateWeek = "UPDATE Times SET Week = " + newWeek + " WHERE id = " + idToUpdate + ";";
				    int entryUpdated2 = stmt.executeUpdate(strUpdateWeek);
				    break;
			    case 3:
					System.out.println("\nEnter the new amount of time: ");
					int newTime = CONSOLE.nextInt();
				    String strUpdateTime = "UPDATE Times SET Minutes = " + newTime + " WHERE id = " + idToUpdate + ";";
				    int entryUpdated3 = stmt.executeUpdate(strUpdateTime);
				    break;
			    case 4:
					System.out.println("\nEnter the new date(ex. 2022-10-13): ");
					String newDate = CONSOLE.next();
				    String strUpdateDate = "UPDATE Times SET Date = '" + newDate + "' WHERE id = " + idToUpdate + ";";
				    int entryUpdated4 = stmt.executeUpdate(strUpdateDate);
				    break;
			    case 5:
					getTasks();
					System.out.println("\nEnter the new task: ");
					CONSOLE.nextLine();
					String newTask = CONSOLE.nextLine();
				    String strUpdateTask = "UPDATE Times SET Task = '" + newTask + "' WHERE id = " + idToUpdate + ";";
				    int entryUpdated5 = stmt.executeUpdate(strUpdateTask);
				    break;
			    case 6:
					System.out.println("\nEnter the new description: ");
					CONSOLE.nextLine();
					String newDescription = CONSOLE.nextLine();
				    String strUpdateDescription = "UPDATE Times SET Description = '" + newDescription + "' WHERE id = " + idToUpdate + ";";
				    int entryUpdated6 = stmt.executeUpdate(strUpdateDescription);
				    break;
		   }
	   }
	   catch(SQLException ex)
	   {
			ex.printStackTrace();
	   }
   }
   
   public static void selectLastLogs(int amount)
   {
	   String strSelectLogs = "SELECT * FROM (SELECT * FROM Times ORDER BY ID DESC LIMIT " + amount + " ) AS sub ORDER BY ID ASC;";
	   try
	   {
			ResultSet rset = stmt.executeQuery(strSelectLogs);
			while(rset.next())
			{
				int id = rset.getInt("ID");
				String course = rset.getString("Course");
				int week = rset.getInt("Week");
				int minutes = rset.getInt("Minutes");
				String date = rset.getString("Date");
				String task = rset.getString("Task");
				String description = rset.getString("Description");
				System.out.println("ID: " + id + ", Course: " + course + ", Week: " + week + ", Minutes: " + minutes + ", Date: " + date + ", Task: " + task + ", Description: " + description);
			}
	   }
	   catch(SQLException ex)
       {
			ex.printStackTrace();
       }
	   

	 System.out.println();
   }
   
   public static void printReport(int week)
   {
	    System.out.println("You should be spending " + TIME_SPENT_IN_CLASSES + " minutes outside of class per week.");
	    ArrayList<String> courses = new ArrayList<String>();
		DecimalFormat df = new DecimalFormat("##0.00%");
		String selectCourses = "SELECT * FROM Courses;";
		try
		{
			ResultSet rset = stmt.executeQuery(selectCourses);
			while(rset.next())
			{
				String course = rset.getString("Course");
				courses.add(course);
			}
			
			for(int i = 0; i < courses.size(); i++)
			{
				String course = courses.get(i);
				int time = 0;
				double percentage = 0.0;
				String selectTimes = "SELECT Course, Minutes FROM Times WHERE Week = " + week + " AND Course = '" + courses.get(i) + "';";
				ResultSet rset2 = stmt.executeQuery(selectTimes);
				while(rset2.next())
				{
					time = time + rset2.getInt("Minutes");
					double percentDone = (double)time;
					double percentTotal = (double)TIME_SPENT_IN_CLASSES;
					percentage = percentDone / percentTotal;
				}
				System.out.println("Course: " + course + " Time: " + time + " " + df.format(percentage));
			}
		}
		catch(SQLException ex)
		{
			ex.printStackTrace();
		}
   }
   
   public static int getIDTasks()
   {
	   try
	   {
	     String strSelectID = "SELECT ID FROM Tasks";
            
            
         ResultSet rset = stmt.executeQuery(strSelectID);
         rset.next();
            
            
         int id = 1;
            
         while(rset.next())
         {
            id++;
         }
		 return id;
	   }
	   catch(SQLException ex)
       {
         ex.printStackTrace();
       }
	   return 0;
   }
   
   public static void addTask()
   {
	   System.out.println("\nWhich class is this for?");
	   listAllClasses();
	   String course = CONSOLE.next();
	   System.out.println("\nWhat is the task name?");
	   CONSOLE.nextLine();
	   String newTask = CONSOLE.nextLine();
	   int newTaskID = getIDTasks();
	   String insertTask = "INSERT INTO Tasks VALUES (" + newTaskID + ", '" + course + "', '" + newTask + "', 0);";
	   try
	   {
		   int taskCreated = stmt.executeUpdate(insertTask);
	   }
	   catch(SQLException ex)
	   {
		   ex.printStackTrace();
	   }
   }
   
   public static void markTaskDone()
   {
	   getTasks();
	   System.out.println("0. Exit");
	   System.out.println("\nEnter the ID of the task you completed.");
	   int idOfTaskDone = CONSOLE.nextInt();
	   if(idOfTaskDone == 0)
	   {
		   return;
	   }
	   System.out.println(idOfTaskDone);
	   String setTaskDone = "UPDATE Tasks SET Completed=1 WHERE ID = " + idOfTaskDone + ";";
	   try
	   {
		   int taskMarkedDone = stmt.executeUpdate(setTaskDone);
	   }
	   catch(SQLException ex)
	   {
		   ex.printStackTrace();
	   }
   }
   
   public static void getTasks()
   {
		System.out.println("\nHere are your uncompleted tasks:");
		String selectTasks = "SELECT * FROM Tasks WHERE Completed = 0;";
		try
		{
			ResultSet rset = stmt.executeQuery(selectTasks);
			while(rset.next())
			{
				int id = rset.getInt("ID");
				String course = rset.getString("Course");
				String task = rset.getString("Task");
				System.out.println("ID: " + id + " " + course + ", " + task);
			}
		}
		catch(SQLException ex)
		{
			ex.printStackTrace();
		}
   }
   
   public static void getTasksByCourse(String course)
   {
		System.out.println("\nHere are your uncompleted tasks for " + course + ":");
		String selectTasks = "SELECT * FROM Tasks WHERE Completed = 0 AND Course = '" + course + "'; ";
		try
		{
			ResultSet rset = stmt.executeQuery(selectTasks);
			while(rset.next())
			{
				int id = rset.getInt("ID");
				//String course = rset.getString("Course");
				String task = rset.getString("Task");
				System.out.println("ID: " + id + " " + course + ", " + task);
			}
		}
		catch(SQLException ex)
		{
			ex.printStackTrace();
		}
   }
   
   public static void addCourse()
   {
	  System.out.println("\nWhat is the new courses name?");
	  String newCourse = CONSOLE.next();
	  int newID = getIDCourses();
	  String insertNewCourse = "INSERT INTO Courses VALUES (" + newID + ", '" + newCourse + "');";
	  try
	  {
		  int success = stmt.executeUpdate(insertNewCourse);
	  }
	  catch(SQLException ex)
	  {
		ex.printStackTrace();
	  }
   }
   
   public static void deleteCourse()
   {
	    System.out.println("\nWhich course would you like to delete?");
		System.out.println("-----------------------------");
		listAllClasses();
		System.out.println("\nEnter the ID of the course you wish to delete.");
		int IDOfCourseToDelete = CONSOLE.nextInt();
		String strDeleteCourse = "DELETE FROM Courses WHERE ID = " + IDOfCourseToDelete;;
		try
	    {
			int result = stmt.executeUpdate(strDeleteCourse);
	    }
	    catch(SQLException ex)
        {
			ex.printStackTrace();
        }
   }
 
   public static int getIDCourses()
   {
	   try
	   {
	     String strSelectID = "SELECT id FROM Courses";
            
            
         ResultSet rset = stmt.executeQuery(strSelectID);
         rset.next();
            
            
         int id = 1;
            
         while(rset.next())
         {
            id++;
         }
		 return id;
	   }
	   catch(SQLException ex)
       {
         ex.printStackTrace();
       }
	   return 0;
   }
}