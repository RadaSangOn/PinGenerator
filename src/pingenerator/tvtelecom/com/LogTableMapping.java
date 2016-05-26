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

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@WebServlet("/LogTableMapping")
public class LogTableMapping extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public LogTableMapping() {
        super();
    }

	@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Logger LOG = Logger.getLogger(LogTableMapping.class.getName());
        request.setCharacterEncoding(Utils.CharacterEncoding);
		HttpSession session = request.getSession(false);
		String userId = ((Integer)session.getAttribute("userId")).toString(); 

		Connection con = null;
		Statement st1 = null;
		String sql1 = "";
		if (userId.equals("1")) {
			sql1 = "select * from job where status <> 'D' and (type = 'SM' or type = 'PV') order by jobid desc";
		} else {
			sql1 = "select * from job where status <> 'D' and (type = 'SM' or type = 'PV') and updatedby = "+userId+" order by jobid desc";
		}
		ResultSet rs1 = null;

		Statement st2 = null;
		String sql2 = "select * from usr where userid = _userId";
		String sql2r = "";
		ResultSet rs2 = null;
		
		String result="failed";
		String TYPE = "";
		String STATUS = "";
		int UPDATEDBY;
		String UPDATEDBYUSERNAME = ""; String UPDATEDBYNAME = "";
		
		Timestamp UPDATEDDATE;
		SimpleDateFormat dFormat = new SimpleDateFormat("dd-MM-yyyy");SimpleDateFormat tFormat = new SimpleDateFormat("hh:mm:ss");
		String uDate = ""; String uTime = "";
		
		String[] desc2a;

        JSONObject json;
        JSONArray jsonA = new JSONArray();
        
		try {
			Context ctx = new InitialContext();
			DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/PinGen");
			con = ds.getConnection();
			st1 = con.createStatement();st2 = con.createStatement();
			rs1 = st1.executeQuery(sql1);
			while (rs1.next()) {
                json = new JSONObject();
                json.put("JOBID",rs1.getString("JOBID"));

                TYPE = rs1.getString("TYPE");
                
                if (TYPE.equals("SM")) {
                	json.put("DIGIT",rs1.getInt("DIGIT"));
                    json.put("LINK","SerialMapCSV?jobId="+rs1.getString("JOBID"));
                } else if (TYPE.equals("PV")) {
                	json.put("DIGIT","-");
                    json.put("LINK","PinGenVIP3CSV?jobId="+rs1.getString("JOBID"));
                } else {
                	json.put("DIGIT","-");
                	json.put("LINK","");
                }
                json.put("AMOUNT",rs1.getLong("AMOUNT"));
                
                
                json.put("TYPE",TYPE);
				if (TYPE.equals("PG")) {TYPE = "Generate PIN";} else if (TYPE.equals("PS")) {TYPE = "Generate specific PIN";}
				else if (TYPE.equals("PV")) {TYPE = "Generate VIP PIN";} else if (TYPE.equals("SM")) {TYPE = "Mapping serial";}
				else if (TYPE.equals("PE")) {TYPE = "Export PIN";} else if (TYPE.equals("PC")) {TYPE = "Compare PIN";}
				else if (TYPE.equals("PL")) {TYPE = "Load PIN";}
                json.put("JOBTYPE",TYPE);
                
                STATUS = rs1.getString("STATUS");
                json.put("STATUS",STATUS);
				if (STATUS.equals("I")) {STATUS = "Initiating";} else if (STATUS.equals("P")) {STATUS = "Processing";}
				else if (STATUS.equals("S")) {STATUS = "Succeed";} else if (STATUS.equals("F")) {STATUS = "Failed";}
				else if (STATUS.equals("D")) {STATUS = "Deleted";}
                json.put("JOBSTATUS",STATUS);
                
                json.put("DESC1",rs1.getString("DESC1"));
                
                json.put("DESC2",rs1.getString("DESC2"));
				desc2a = rs1.getString("DESC2").split("\\|");
                json.put("BATCHNUMBER",desc2a[0]+desc2a[1]);
                
                UPDATEDBY = rs1.getInt("UPDATEDBY");
                json.put("UPDATEDBY",UPDATEDBY);
                sql2r = sql2.replaceAll("_userId", Integer.toString(UPDATEDBY));
				if (rs2 != null) {rs2.close();}
				rs2 = st2.executeQuery(sql2r);
				if (rs2.next()) {UPDATEDBYUSERNAME = rs2.getString("USERNAME");UPDATEDBYNAME = rs2.getString("NAME");} else {UPDATEDBYUSERNAME = ""; UPDATEDBYNAME = "";}
				json.put("UPDATEDBYUSERNAME",UPDATEDBYUSERNAME);
                json.put("UPDATEDBYNAME",UPDATEDBYNAME);
                
                UPDATEDDATE = rs1.getTimestamp("UPDATEDDATE");
                uDate = dFormat.format(UPDATEDDATE);uTime = tFormat.format(UPDATEDDATE);
                json.put("UPDATEDDATE",uDate);json.put("UPDATEDTIME",uTime);
                
                jsonA.add(json);
			}
			result = "succeed";
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
		JSONObject res = new JSONObject();
		res.put("result", result);
		res.put("logMapping", jsonA);
LOG.log(Level.INFO,"LogTableMapping jsonZ: {0}",new Object[]{res.toJSONString()});		
		response.setContentType("application/json");
		response.setCharacterEncoding(Utils.CharacterEncoding);
		PrintWriter out = response.getWriter();
		res.writeJSONString(out);
		out.flush();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
