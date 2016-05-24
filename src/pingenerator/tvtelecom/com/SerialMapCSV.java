package pingenerator.tvtelecom.com;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

@WebServlet("/SerialMapCSV")
public class SerialMapCSV extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public SerialMapCSV() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Logger LOG = Logger.getLogger(SerialMapCSV.class.getName());
        request.setCharacterEncoding(Utils.CharacterEncoding);
        String jobId = request.getParameter("jobId");
        
LOG.log(Level.INFO,"SerialMapCSV JobId:{0}",new Object[]{jobId});

		Connection con = null;
		Statement st1 = null;
		String sql11 = "select * from job where jobid = '" + jobId + "'";
		String sql12 = "select * from pattern where patternid = _patternid";
		String sql13 ="select * from pinhist where status = 'M' and jobid = '" + jobId + "'";
		ResultSet rs1 = null;
		
		String fileName = "PIN_BATXXXXXX";
		String batchNumber = "";
		String batchPrefix = "";
		String result="";
		try {
			Context ctx = new InitialContext();
			DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/PinGen");
			con = ds.getConnection();
			st1 = con.createStatement();
			
			rs1 = st1.executeQuery(sql11);
			if (rs1.next()) {
				String[] desc2a = rs1.getString("DESC2").split("\\|");
				batchPrefix = desc2a[0];
				batchNumber = desc2a[1];
				int patternId = rs1.getInt("PATTERNID"); 
				fileName = "PIN_" + batchPrefix + batchNumber;
				rs1.close();
				sql12 = sql12.replaceAll("_patternid", Integer.toString(patternId));
				rs1 = st1.executeQuery(sql12);
				
				if (rs1.next()) {
					String channelname = rs1.getString("CHANNEL");
					
					rs1.close();
					rs1 = st1.executeQuery(sql13);
					result = "Sr. No,Voucher Template type,Voucher Batch Number,Voucher Template Name,Serial ID,Pin Number,Status,Package Name,Reseller Account Number,Lock status,Scrap status,Tenant Code\r\n";
					int count = 0;
					while (rs1.next()) {
						result += ++count + ",External,"+batchPrefix+batchNumber+","+channelname+","+rs1.getString("SERIAL")+","+rs1.getString("PIN")+",Generated,,,Lock,Unscrap,Default\r\n";
					}
				}
				

			}
LOG.log(Level.INFO,"SerialMapCSV result:{0}",new Object[]{result});
		} catch(NamingException | SQLException ex) {
			LOG.log(Level.SEVERE, ex.getMessage(), ex);
			result = "failed";
		} finally {
		    try {
		        if (rs1 != null) {rs1.close();}if (st1 != null) {st1.close();}
		        if (con != null) {con.close();}
		    } catch (SQLException ex) {
		    	LOG.log(Level.WARNING, ex.getMessage(), ex);
		    }
		}
		//SimpleDateFormat dFileFormat = new SimpleDateFormat("yyMMdd_hhmmss");
		//String fileName = "SerialMap_"+dFileFormat.format(new Date());
		response.setContentType("text/csv");
		response.setHeader("Content-Disposition", "attachment; filename=\""+fileName+".csv\"");
		response.setCharacterEncoding(Utils.CharacterEncoding);
		PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
