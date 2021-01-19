package com.todo.spring.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "productmanagement")
@NoArgsConstructor
public class ProductManagement {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long product_no;
	
	@Column(length = 256, nullable = false)
	private String order_no;
	
	@Column(length = 20, nullable = false)
	private String customers;
	
	@Column(length = 20, nullable = false)
	private String product_name;
	
	@Column(length = 10)
	private int product_size;
	
	@Column(length = 10, nullable = false)
	private int quantity;
	
	@Column(length = 10, nullable = false)
	private String materials;
	
	@Column(length = 10, nullable = false)
	private int required_quantity;
	
	@Column(length = 10)
	private int product_quantity;
	
	@Column(length = 10, nullable = false)
	private String outsourcing;
	
	@Column(nullable = false)
	private String deadline;
	
	@Column()
	private String start_date;
	
	@Column()
	private String end_date;
	
	@Builder
	public ProductManagement(String order_no, String customers, String product_name, int product_size, 
			int quantity, String materials, int required_quantity, int product_quantity, String outsourcing,
			String deadline, String start_date, String end_date) {
		this.order_no = order_no;
		this.customers = customers;
		this.product_name = product_name;
		this.product_size = product_size;
		this.quantity = quantity;
		this.materials = materials;
		this.required_quantity = required_quantity;
		this.product_quantity = product_quantity;
		this.outsourcing = outsourcing;
		this.deadline = deadline;
		this.start_date = start_date;
		this.end_date = end_date;
	}
}
