<?php

namespace XVEngine\Core\Handler\WhenHandler;

use JsonSerializable;

class CaseExpresion  implements JsonSerializable {

    /**
     *
     * @var mixed[] 
     */
    public $cases = [];
    
    /**
     * Check if $param 1 is equal to $param2
     * 
     * @param mixed $param1
     * @param mixed $param2
     * return $this;
     */
    public function isEqual($param1, $param2) {
        $this->cases[] = array(
            "type" => __FUNCTION__,
            "param1" => $param1,
            "param2" => $param2,
        );

        return $this;
    }

    /**
     * Check if $param1 is not equal than $param2
     *
     * @param mixed $param1
     * @param mixed $param2
     * @return $this
     */
    public function isNotEqual($param1, $param2) {
        $this->cases[] = array(
            "type" => __FUNCTION__,
            "param1" => $param1,
            "param2" => $param2,
        );

        return $this;
    }


    
    /**
     * Check if $pram1 is less than $param2
     *
     * @param mixed $param1
     * @param mixed $param2
     * @return $this
     */
    public function isLess($param1, $param2) {
        $this->cases[] = array(
            "type" => __FUNCTION__,
            "param1" => $param1,
            "param2" => $param2,
        );

        return $this;
    }


    /**
     * Check if $param1 is in array passed in $param2
     *
     * @author Krzysztof Bednarczyk
     * @param $param1
     * @param $param2
     * @return $this
     */
    public function inArray($param1, $param2) {
        $this->cases[] = array(
            "type" => __FUNCTION__,
            "param1" => $param1,
            "param2" => $param2,
        );

        return $this;
    }


    /**
     * Check if $param is positive
     *
     * @author Krzysztof Bednarczyk
     * @param $param1
     * @return $this
     */
    public function isPositive($param1) {
        $this->cases[] = array(
            "type" => __FUNCTION__,
            "param1" => $param1
        );

        return $this;
    }

    /**
     * Check if $param is positive
     *
     * @author Krzysztof Bednarczyk
     * @param $param1
     * @return $this
     */
    public function isEmpty($param1) {
        $this->cases[] = array(
            "type" => __FUNCTION__,
            "param1" => $param1
        );

        return $this;
    }


    /**
     * Check if $param1 is negative
     *
     * @author Krzysztof Bednarczyk
     * @param $param1
     * @return $this
     */
    public function isNegative($param1) {
        $this->cases[] = array(
            "type" => __FUNCTION__,
            "param1" => $param1
        );

        return $this;
    }


    /**
     * Serialize this case to array
     * @author Krzysztof Bednarczyk
     * @return \mixed[]
     */
    public function jsonSerialize() {
        return $this->cases;
    }

}
