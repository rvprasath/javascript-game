package com.balloonpop.dto;

/**
 * @author vishnu
 *
 */
public class PlayerScoreDto {

	private int id;
	private String playerName;
	private int score;
	private String profileLink;
	private String companyName;
	private Double randomNumber;

	/**
	 * constructor
	 */
	public PlayerScoreDto() {
	}

	/**
	 * id
	 * 
	 * @return id
	 */
	public int getId() {
		return id;
	}

	/**
	 * id
	 * 
	 * @param id
	 *            int
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * playerName
	 * 
	 * @return playerName
	 */
	public String getPlayerName() {
		return playerName;
	}

	/**
	 * playerName
	 * 
	 * @param playerName
	 *            String
	 */
	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	/**
	 * score
	 * 
	 * @return score
	 */
	public int getScore() {
		return score;
	}

	/**
	 * score
	 * 
	 * @param score
	 *            int
	 */
	public void setScore(int score) {
		this.score = score;
	}

	/**
	 * profileLink
	 * 
	 * @return profileLink
	 */
	public String getProfileLink() {
		return profileLink;
	}

	/**
	 * profileLink
	 * 
	 * @param profileLink
	 *            String
	 */
	public void setProfileLink(String profileLink) {
		this.profileLink = profileLink;
	}

	/**
	 * companyName
	 * 
	 * @return companyName
	 */
	public String getCompanyName() {
		return companyName;
	}

	/**
	 * companyName
	 * 
	 * @param companyName
	 *            String
	 */
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	/**
	 * randomNumber
	 * 
	 * @return randomNumber
	 */
	public Double getRandomNumber() {
		return randomNumber;
	}

	/**
	 * randomNumber
	 * 
	 * @param randomNumber
	 *            Double
	 */
	public void setRandomNumber(Double randomNumber) {
		this.randomNumber = randomNumber;
	}
}