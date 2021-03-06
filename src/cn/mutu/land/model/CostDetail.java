package cn.mutu.land.model;

// Generated 2017-3-6 20:24:26 by Hibernate Tools 4.0.0

/**
 * CostDetail generated by hbm2java
 */
public class CostDetail implements java.io.Serializable {

	private Integer id;
	private String projectId;
	private String projectName;
	private String departName;
	private String applyUser;
	private String clAim;
	private String clStart;
	private String clEnd;
	private Double clGoTaxi;
	private Double clGoTrain;
	private Double clAimTaxi;
	private Double clAimHotel;
	private Double clAimFood;
	private Double clAimOther;
	private Double clBackTaxi;
	private Double clBackTrain;
	private Double clDay;
	private Integer clFapiao;
	private Double clBuzhu;
	private Double clHuankuan;
	private Double clBaoxiao;
	private Double rcBaoxiao;
	private Integer rcFapiao;
	private String costDescript;
	private String costDate;
	private String costType;
	private String costUse;
	private Double costMuch;
	private Double incomeMuch;
	private Double accountRemain;
	private String shouKuanRen;
	private String bz;
	private String dealStatus;

	public CostDetail() {
	}

	public CostDetail(String projectId, String projectName, String departName,
			String applyUser, String clAim, String clStart, String clEnd,
			Double clGoTaxi, Double clGoTrain, Double clAimTaxi,
			Double clAimHotel, Double clAimFood, Double clAimOther,
			Double clBackTaxi, Double clBackTrain, Double clDay,
			Integer clFapiao, Double clBuzhu, Double clHuankuan,
			Double clBaoxiao, Double rcBaoxiao, Integer rcFapiao,
			String costDescript, String costDate, String costType,
			String costUse, Double costMuch, Double incomeMuch,
			Double accountRemain, String shouKuanRen, String bz,
			String dealStatus) {
		this.projectId = projectId;
		this.projectName = projectName;
		this.departName = departName;
		this.applyUser = applyUser;
		this.clAim = clAim;
		this.clStart = clStart;
		this.clEnd = clEnd;
		this.clGoTaxi = clGoTaxi;
		this.clGoTrain = clGoTrain;
		this.clAimTaxi = clAimTaxi;
		this.clAimHotel = clAimHotel;
		this.clAimFood = clAimFood;
		this.clAimOther = clAimOther;
		this.clBackTaxi = clBackTaxi;
		this.clBackTrain = clBackTrain;
		this.clDay = clDay;
		this.clFapiao = clFapiao;
		this.clBuzhu = clBuzhu;
		this.clHuankuan = clHuankuan;
		this.clBaoxiao = clBaoxiao;
		this.rcBaoxiao = rcBaoxiao;
		this.rcFapiao = rcFapiao;
		this.costDescript = costDescript;
		this.costDate = costDate;
		this.costType = costType;
		this.costUse = costUse;
		this.costMuch = costMuch;
		this.incomeMuch = incomeMuch;
		this.accountRemain = accountRemain;
		this.shouKuanRen = shouKuanRen;
		this.bz = bz;
		this.dealStatus = dealStatus;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProjectId() {
		return this.projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getProjectName() {
		return this.projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getDepartName() {
		return this.departName;
	}

	public void setDepartName(String departName) {
		this.departName = departName;
	}

	public String getApplyUser() {
		return this.applyUser;
	}

	public void setApplyUser(String applyUser) {
		this.applyUser = applyUser;
	}

	public String getClAim() {
		return this.clAim;
	}

	public void setClAim(String clAim) {
		this.clAim = clAim;
	}

	public String getClStart() {
		return this.clStart;
	}

	public void setClStart(String clStart) {
		this.clStart = clStart;
	}

	public String getClEnd() {
		return this.clEnd;
	}

	public void setClEnd(String clEnd) {
		this.clEnd = clEnd;
	}

	public Double getClGoTaxi() {
		return this.clGoTaxi;
	}

	public void setClGoTaxi(Double clGoTaxi) {
		this.clGoTaxi = clGoTaxi;
	}

	public Double getClGoTrain() {
		return this.clGoTrain;
	}

	public void setClGoTrain(Double clGoTrain) {
		this.clGoTrain = clGoTrain;
	}

	public Double getClAimTaxi() {
		return this.clAimTaxi;
	}

	public void setClAimTaxi(Double clAimTaxi) {
		this.clAimTaxi = clAimTaxi;
	}

	public Double getClAimHotel() {
		return this.clAimHotel;
	}

	public void setClAimHotel(Double clAimHotel) {
		this.clAimHotel = clAimHotel;
	}

	public Double getClAimFood() {
		return this.clAimFood;
	}

	public void setClAimFood(Double clAimFood) {
		this.clAimFood = clAimFood;
	}

	public Double getClAimOther() {
		return this.clAimOther;
	}

	public void setClAimOther(Double clAimOther) {
		this.clAimOther = clAimOther;
	}

	public Double getClBackTaxi() {
		return this.clBackTaxi;
	}

	public void setClBackTaxi(Double clBackTaxi) {
		this.clBackTaxi = clBackTaxi;
	}

	public Double getClBackTrain() {
		return this.clBackTrain;
	}

	public void setClBackTrain(Double clBackTrain) {
		this.clBackTrain = clBackTrain;
	}

	public Double getClDay() {
		return this.clDay;
	}

	public void setClDay(Double clDay) {
		this.clDay = clDay;
	}

	public Integer getClFapiao() {
		return this.clFapiao;
	}

	public void setClFapiao(Integer clFapiao) {
		this.clFapiao = clFapiao;
	}

	public Double getClBuzhu() {
		return this.clBuzhu;
	}

	public void setClBuzhu(Double clBuzhu) {
		this.clBuzhu = clBuzhu;
	}

	public Double getClHuankuan() {
		return this.clHuankuan;
	}

	public void setClHuankuan(Double clHuankuan) {
		this.clHuankuan = clHuankuan;
	}

	public Double getClBaoxiao() {
		return this.clBaoxiao;
	}

	public void setClBaoxiao(Double clBaoxiao) {
		this.clBaoxiao = clBaoxiao;
	}

	public Double getRcBaoxiao() {
		return this.rcBaoxiao;
	}

	public void setRcBaoxiao(Double rcBaoxiao) {
		this.rcBaoxiao = rcBaoxiao;
	}

	public Integer getRcFapiao() {
		return this.rcFapiao;
	}

	public void setRcFapiao(Integer rcFapiao) {
		this.rcFapiao = rcFapiao;
	}

	public String getCostDescript() {
		return this.costDescript;
	}

	public void setCostDescript(String costDescript) {
		this.costDescript = costDescript;
	}

	public String getCostDate() {
		return this.costDate;
	}

	public void setCostDate(String costDate) {
		this.costDate = costDate;
	}

	public String getCostType() {
		return this.costType;
	}

	public void setCostType(String costType) {
		this.costType = costType;
	}

	public String getCostUse() {
		return this.costUse;
	}

	public void setCostUse(String costUse) {
		this.costUse = costUse;
	}

	public Double getCostMuch() {
		return this.costMuch;
	}

	public void setCostMuch(Double costMuch) {
		this.costMuch = costMuch;
	}

	public Double getIncomeMuch() {
		return this.incomeMuch;
	}

	public void setIncomeMuch(Double incomeMuch) {
		this.incomeMuch = incomeMuch;
	}

	public Double getAccountRemain() {
		return this.accountRemain;
	}

	public void setAccountRemain(Double accountRemain) {
		this.accountRemain = accountRemain;
	}

	public String getShouKuanRen() {
		return this.shouKuanRen;
	}

	public void setShouKuanRen(String shouKuanRen) {
		this.shouKuanRen = shouKuanRen;
	}

	public String getBz() {
		return this.bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	public String getDealStatus() {
		return this.dealStatus;
	}

	public void setDealStatus(String dealStatus) {
		this.dealStatus = dealStatus;
	}

}
