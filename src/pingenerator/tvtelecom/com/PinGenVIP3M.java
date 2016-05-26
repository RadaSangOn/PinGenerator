package pingenerator.tvtelecom.com;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.Connection;
import java.sql.PreparedStatement;
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
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

@WebServlet("/PinGenVIP3M")
public class PinGenVIP3M extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public PinGenVIP3M() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Logger LOG = Logger.getLogger(PinGenVIP3M.class.getName());
        request.setCharacterEncoding(Utils.CharacterEncoding);    
        String jobId = request.getParameter("jobId");
LOG.log(Level.INFO,"PinGenVIP3M jobId: {0}",new Object[]{jobId});
        HttpSession session = request.getSession(false);
		String userId = ((Integer)session.getAttribute("userId")).toString();
        
		Connection con = null;
		Statement st1 = null;
		String sql1 ="select * from job where status = 'P' and jobid = '" + jobId + "'";
		String sql11 ="select * from pin where jobid = '" + jobId + "'";
		ResultSet rs1 = null;
		
		PreparedStatement st2 = null;
		String sql2 = "update pin set serial = ?, status = 'M', updatedby = "+userId+", updateddate = CURRENT_TIMESTAMP where pin = ?";
		
		Statement st3 = null;
		String sql3 = "UPDATE job SET AMOUNT = _amount, STATUS = 'S' WHERE jobid = '"+jobId+"'";
		
		String desc2 = "";
		String batchNumberPrefix = "";
		String batchNumber = "";
		String serialNumberPrefix = "";
		String serialNumber = "";
		
		String pin = "";
		
		String result="failed";
		try {
			Context ctx = new InitialContext();
			DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/PinGen");

			con = ds.getConnection();
			st1 = con.createStatement();
			rs1 = st1.executeQuery(sql1);
			if (rs1.next()) {
				desc2 = rs1.getString("DESC2");
				String[] desc2a = desc2.split("\\|"); 
				batchNumberPrefix = desc2a[0];
				batchNumber = desc2a[1];
				serialNumberPrefix = desc2a[2];
				serialNumber = desc2a[3];
LOG.log(Level.INFO,"PinGenVIP3M {0} {1} {2} {3}",new Object[]{batchNumberPrefix,batchNumber,serialNumberPrefix,serialNumber});
				int digit = 12;
				long maxSerial = Long.parseLong(serialNumber);
				long maximumSerial = Long.parseLong(String.format("%1$" + (digit-serialNumberPrefix.length()) + "d", 9).replace(' ', '9'));
//LOG.log(Level.INFO,"SerialMap3X XXXXXXXX:{0}",new Object[]{maximumSerial});
				if (maxSerial > maximumSerial) {maxSerial = 1L;}
				String maxSerialFormat = "9" + String.format("%0$" + (digit-serialNumberPrefix.length()) + "d", 0).replace(' ', '0');
				maxSerial = Long.parseLong(maxSerialFormat) + maxSerial;
				//serialNumber = Long.toString(maxSerial).substring(1);
				
				long serialOne = Long.parseLong(maxSerialFormat) + 1;
				maximumSerial = Long.parseLong(String.format("%1$" + (digit-serialNumberPrefix.length()+1) + "d", 9).replace(' ', '9'));
//LOG.log(Level.INFO,"SerialMap3X YYYYYYYY:{0}",new Object[]{maximumSerial});
				long serial = maxSerial;
				
				st2 = con.prepareStatement(sql2);
				rs1.close();
				rs1 = st1.executeQuery(sql11);
				int count = 0;
				while (rs1.next()) {count++;
					pin = rs1.getString("PIN");

					st2.setString(1, serialNumberPrefix + Long.toString(serial).substring(1));
					st2.setString(2, pin);
					st2.executeUpdate();
					serial++;
					if (serial > maximumSerial) {serial = serialOne;}
				}
				if (serial != serialOne) {serial--;}
				Path pathSerial = Paths.get(Utils.PathFileMappingSerialVIPSerialNumber3);
				Files.write(pathSerial, (serialNumberPrefix+"|"+Long.toString(serial).substring(1)).getBytes(), StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);
				
				st3 = con.createStatement();
				sql3 = sql3.replaceAll("_amount", Integer.toString(count));
				st3.executeUpdate(sql3);

				result = "succeed";
			}
		} catch (java.sql.SQLIntegrityConstraintViolationException e) {
			result = "duplicated";
		} catch(NamingException | SQLException ex) {
			LOG.log(Level.SEVERE, ex.getMessage(), ex);
			result = "failed";
		} finally {
            try {
                if (st1 != null) {st1.close();}
                if (con != null) {con.close();}
            } catch (SQLException ex) {
            	LOG.log(Level.WARNING, ex.getMessage(), ex);
            }
		}
LOG.log(Level.INFO,"PinGenVIP3M result: {0}",new Object[]{result});
		response.setContentType("application/json");
		response.setCharacterEncoding(Utils.CharacterEncoding);
		PrintWriter out = response.getWriter();
		out.print("{\"result\":\""+result+"\",\"jobId\":"+jobId+"}");
		out.flush();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
