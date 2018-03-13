package com.balloonpop.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author vishnu
 *
 */
@Entity
@Table(name = "player_score")
public class PlayerScore implements java.io.Serializable {

	/** serialVersionUID **/
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	@Column(name = "player_name")
	private String playerName;
	@Column(name = "score")
	private int score;
	@Column(name = "profile_link")
	private String profileLink;
	@Column(name = "company_name")
	private String companyName;
	@Column(name = "random_number")
	private Double randomNumber;

	/**
	 * constructor
	 */
	public PlayerScore() {
	}

	/**
	 * Id
	 * 
	 * @return id
	 */
	public int getId() {
		return id;
	}

	/**
	 * Id
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
	 * @param randomNumber
	 *            Double
	 */
	public void setRandomNumber(Double randomNumber) {
		this.randomNumber = randomNumber;
	}
}