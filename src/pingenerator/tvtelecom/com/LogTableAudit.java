package pingenerator.tvtelecom.com;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
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

@WebServlet("/LogTableAudit")
public class LogTableAudit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public LogTableAudit() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Logger LOG = Logger.getLogger(LogTableAudit.class.getName());
        request.setCharacterEncoding(Utils.CharacterEncoding);
        
		HttpSession session = request.getSession(false);
		String userId = ((Integer)session.getAttribute("userId")).toString();
        
		Connection con = null;
		Statement st1 = null;
		String sql1 = "";
		if (userId.equals("1")) {
			sql1 = "select * from job order by updateddate desc";
		} else {
			sql1 = "select * from job where updatedby = "+userId+" order by updateddate desc";
		}
		ResultSet rs1 = null;
		
		Statement st2 = null;
		String sql2 = "select * from usr where userid = _userId";
		String sql2r = "";
		ResultSet rs2 = null;
		
		String result="failed";
		Timestamp UPDATEDDATE;
		SimpleDateFormat dFormat = new SimpleDateFormat("dd-MM-yyyy");SimpleDateFormat tFormat = new SimpleDateFormat("hh:mm:ss");
		String uDate = ""; String uTime = "";
		String TYPE;
		String STATUS;
		int UPDATEDBY;
		String UPDATEDBYUSERNAME = "";
		String UPDATEDBYNAME = "";
		String selectString = "";
		try {
			Context ctx = new InitialContext();
			DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/PinGen");
			con = ds.getConnection();
			st1 = con.createStatement();st2 = con.createStatement();
			rs1 = st1.executeQuery(sql1);
			while (rs1.next()) {
				UPDATEDDATE = rs1.getTimestamp("UPDATEDDATE");
				uDate = dFormat.format(UPDATEDDATE);uTime = tFormat.format(UPDATEDDATE);
				TYPE = rs1.getString("TYPE");
				if (TYPE.equals("PG")) {TYPE = "Generate PIN";} else if (TYPE.equals("PS")) {TYPE = "Generate specific PIN";}
				else if (TYPE.equals("PV")) {TYPE = "Generate VIP PIN";} else if (TYPE.equals("SM")) {TYPE = "Mapping serial";}
				else if (TYPE.equals("PE")) {TYPE = "Export PIN";} else if (TYPE.equals("PC")) {TYPE = "Compare PIN";}
				else if (TYPE.equals("PL")) {TYPE = "Load PIN";}
				STATUS = rs1.getString("STATUS");
				if (STATUS.equals("I")) {STATUS = "Initiating";} else if (STATUS.equals("P")) {STATUS = "Processing";}
				else if (STATUS.equals("S")) {STATUS = "Succeed";} else if (STATUS.equals("F")) {STATUS = "Failed";}
				else if (STATUS.equals("D")) {STATUS = "Deleted";}
				UPDATEDBY = rs1.getInt("UPDATEDBY");
				sql2r = sql2.replaceAll("_userId", Integer.toString(UPDATEDBY));
				if (rs2 != null) {rs2.close();}
				rs2 = st2.executeQuery(sql2r);
				if (rs2.next()) {UPDATEDBYUSERNAME = rs2.getString("USERNAME");UPDATEDBYNAME = rs2.getString("NAME");} else {UPDATEDBYUSERNAME = ""; UPDATEDBYNAME = "";}
				selectString += "<tr><td class='align-center'>"+uDate+"</td><td class='align-center'>"+uTime+"</td>";
				selectString += "<td class='align-left'>"+TYPE+"</td>"; //selectString += "<td class='align-center'>"+TYPE+"</td><td class='align-center'>"+STATUS+"</td>";
				selectString += "<td class='align-center'>"+UPDATEDBYUSERNAME+"</td><td class='align-left'>"+UPDATEDBYNAME+"</td></tr>";
			}
			result = "succeed";
		} catch(NamingException | SQLException ex) {
			LOG.log(Level.SEVERE, ex.getMessage(), ex);
			result = "failed";
		} finally {
            try {
                if (rs1 != null) {rs1.close();}if (rs2 != null) {rs2.close();}
                if (st1 != null) {st1.close();}if (st2 != null) {st2.close();}
                if (con != null) {con.close();}
            } catch (SQLException ex) {
            	LOG.log(Level.WARNING, ex.getMessage(), ex);
            }
		}	
LOG.log(Level.INFO,"{0} {1}",new Object[]{"PatternTable: ",result});
		response.setCharacterEncoding(Utils.CharacterEncoding);
		PrintWriter out = response.getWriter();
		out.print(selectString);
		out.flush();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
