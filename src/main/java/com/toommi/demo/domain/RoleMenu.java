package com.toommi.demo.domain;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

@Data
@ToString
@NonNull
public class RoleMenu {

    private Long role_id;
    private Long systemmenu_id;


}
